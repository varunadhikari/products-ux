import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderSummaryData } from '@app/_models/order.summary.data';
import { OrderSummaryItemData } from '@app/_models/order.summary.items';
import { Tabledata } from '@app/_models/table.data';
import { AccountService } from '@app/_services';
import { OrderProductService } from '@app/_services/order.product.service';
import { CurrencyPipe } from '@angular/common';
import { User } from '@app/_models';


/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'product.list-component',
  templateUrl: 'product.list.component.html',
})
export class ProductList implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'code', 'batch', 'mfdate', 'expdate','dealerPrice','mrp','availablequantity','check'];
  dataSource = new MatTableDataSource<Tabledata>();
  clickedRows = new Set<Tabledata>();
  ELEMENT_DATA : Tabledata[] = [];
  isDataLoaded : boolean = false;
  orderDetails : OrderSummaryData;
  user: User;

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
    this.user = this.accountService.userValue;
    if(this.user.role==='ADMIN'){
      this.displayedColumns = ['id', 'name', 'code', 'batch', 'mfdate', 'expdate', 'price','dealerPrice','mrp','availablequantity','check'];
    }else{
      this.displayedColumns = ['id', 'name', 'code', 'batch', 'mfdate', 'expdate','dealerPrice','mrp','availablequantity','check'];
    }
    this.orderProdservice.getAllProducts().subscribe(prods =>{
      prods.forEach((p,i) => {
        const data  = {
          id : p.id,
	        name: p.name,
	        brand: p.company,
	        //description: p.description,
          code: p.code,
          batch: p.batch,
          mfgdate: p.mfgDate,
          expiryDate: p.expiryDate,
          dealerPrice: p.dealerPrice,
          mrp: p.mrp,
	        price: p.price,
	        availablequantity: p.quantity,
          quantity:0,
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
        quantity : row.quantity,
        rate : row.price,
        price : row.quantity * row.price
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
