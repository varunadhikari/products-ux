import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderSummaryItemData } from "@app/_models/order.summary.items";
import { OrderSummaryData } from "@app/_models/order.summary.data";
import { Order } from "@app/_models/order";
import { OrderProductService } from "@app/_services/order.product.service";
import { AccountService } from "@app/_services";
import { OrderDetail } from "@app/_models/order.detail";
import { User } from "@app/_models";
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'order-summary-component',
    templateUrl: 'order.summary.component.html',
  })
export class OrderSummaryComponent implements OnInit{

    isDataLoaded : boolean = false;
    orderId : number;
    data : OrderSummaryData;
    summaryData?: OrderSummaryData;
    amountBeforeTax: number = 0;
    isDisabled: boolean = false;
    orderToSave: Order;
    user: User;

    constructor(private orderProdservice : OrderProductService,
        private accountService : AccountService,
        private route: ActivatedRoute,
    private router: Router) {
            this.data = {
                tax : null,
                totalPrice : null,
                items : []
        }
        
        this.orderToSave = {
            userId: null,
            orderDate: null,
            orderDetailList: [],
            status: null,
            tax: null,
            totalAmount :null
        }
        this.user = this.accountService.userValue;
    }

    ngOnInit() {        
        const value = this.route.snapshot.paramMap.get('orderId');
        if(value!=='order'){            
            this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('orderId'));
            this.orderProdservice.getOrderSummary(this.orderId).subscribe(order => {
                this.data.tax = order.tax;
                this.data.totalPrice = order.totalAmount;
                order.orderDetailList.forEach((element,i) => {
                    const itemData = {
                        id: element.id,
                        sno : i+1,
                        itemdesc : element.description,
                        quantity : element.quantity,
                        rate : element.price,
                        price : element.quantity * element.price
                    };
                    this.data.items.push(itemData);
                });                
                this.data.items.forEach(d => {
                    this.amountBeforeTax = this.amountBeforeTax + d.price;
                    this.data.tax = 5;
                    this.data.totalPrice = this.amountBeforeTax + ((this.data.tax * this.amountBeforeTax) / 100);
                    this.isDataLoaded = true;
                });
                this.isDataLoaded = true;
            })
            this.isDisabled = true;
        }else{
            this.accountService.getOrderDetails().subscribe(orderDetail => {
                this.data.items = orderDetail.items;
                orderDetail.items.forEach(d => {
                    this.amountBeforeTax = this.amountBeforeTax + d.price;
                });
                this.data.tax = 5;
                this.data.totalPrice = this.amountBeforeTax + ((this.data.tax * this.amountBeforeTax) / 100);
                this.isDataLoaded = true;
            });
            this.isDisabled = false;
        }
    }
    
    public submitOrderdetails() {
        const user = this.accountService.userValue.id;
        if (this.data !== undefined) {
            this.orderToSave = {
                id: null,
            userId: user,
            orderDate: new Date(),
            orderDetailList: [],
            status: "Ordered",
            tax: this.data.tax,
            totalAmount :this.data.totalPrice
            }

            this.data.items.forEach(item => {
                let itemP : OrderDetail = {
                    productId: item.id,
                    quantity: item.quantity,
                    totalAmount: item.price,
                    company: null,
                    description: null,
                    id: null,
                    name: null,
                    price:null
                }
                this.orderToSave.orderDetailList.push(itemP);
            });
            console.log(this.orderToSave);
            this.orderProdservice.saveOrder(this.orderToSave)
                .subscribe(data => {
                    alert("Order Placed Successfully");                    
                    this.router.navigate(['/orders/'+user]);
                },     
                    error => {
                    alert("Error has occured. Please check logs")
                    console.log('Error while saving order: ', error);
                });            
        }
    }
}