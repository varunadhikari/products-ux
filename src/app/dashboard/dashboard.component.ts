import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderSummaryData } from '@app/_models/order.summary.data';
import { OrderSummaryItemData } from '@app/_models/order.summary.items';
import { Tabledata } from '@app/_models/table.data';
import { AccountService } from '@app/_services';
import { OrderProductService } from '@app/_services/order.product.service';


/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'brand', 'price','availablequantity','check'];
  dataSource = new MatTableDataSource<Tabledata>();
  clickedRows = new Set<Tabledata>();
  ELEMENT_DATA : Tabledata[] = [];
  isDataLoaded : boolean = false;
  orderDetails : OrderSummaryData;

  constructor(private orderProdservice : OrderProductService,
    private accountService: AccountService,
    private router : Router) { 
      this.orderDetails = {
        tax : 5,
        totalPrice : null,
        items : []
    }
  }

  ngOnInit() {
    this.orderProdservice.getAllProducts().subscribe(prods =>{
      prods.forEach((p,i) => {
        const data  = {
          id : p.id,
	        name: p.name,
	        brand: p.company,
	        //description: p.description,
	        price: p.price,
	        availablequantity: p.quantity,
          check : false
        }
        this.ELEMENT_DATA.push(data)});
        this.isDataLoaded = true        
      this.dataSource.data = this.ELEMENT_DATA;
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public addEditOrderdetails(row:Tabledata,check:boolean){
    let orderItem : OrderSummaryItemData;    
    if(!check){
      this.orderDetails.items = this.orderDetails.items.filter( h => h.id !== row.id);
    }else{
      orderItem = {
        id: row.id,
        itemdesc : row.name,
        quantity : row.availablequantity,
        rate : row.price,
        price : row.availablequantity * row.price
      }
      this.orderDetails.items.push(orderItem);
    }
  }

  public submitOrderdetails(){
    let sum : number;
    this.orderDetails.items.forEach((element,i) => {
      element.sno = i+1;
      sum = sum+element.price;
    });
    this.orderDetails.totalPrice = sum + ((this.orderDetails.tax * sum)/100);
    this.accountService.sendOrderDetails(this.orderDetails);
    this.router.navigate(['/osummary/order']);
  }

}
