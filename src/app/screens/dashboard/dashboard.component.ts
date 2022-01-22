import {Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderSummaryData } from '@app/_models/order.summary.data';
import { OrderSummaryItemData } from '@app/_models/order.summary.items';
import { Tabledata } from '@app/_models/table.data';
import { AccountService } from '@app/_services';
import { OrderProductService } from '@app/_services/order.product.service';
import { CurrencyPipe } from '@angular/common';
import { Order } from '@app/_models/order';


/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  //displayedColumns: string[] = ['id', 'name', 'brand', 'price','availablequantity'];
  displayedColumns: string[] = ['id', 'name', 'price','availablequantity'];
  dataSource = new MatTableDataSource<Tabledata>();
  clickedRows = new Set<Tabledata>();
  ELEMENT_DATA : Tabledata[] = [];
  isDataLoaded : boolean = false;
  orderDetails : OrderSummaryData;
  userId : string;
  orders : Order[];

  constructor(private orderProdservice : OrderProductService,
    private accountService: AccountService,
    private route: ActivatedRoute,
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
	        price: p.dealerPrice,
	        availablequantity: p.quantity,
          check : false
        }
        this.ELEMENT_DATA.push(data)});
        this.isDataLoaded = true        
      this.dataSource.data = this.ELEMENT_DATA;
    })
      const user = this.accountService.userValue;
      if (user !== undefined && user.role === "ADMIN") {
        this.orderProdservice.getAllOrdersByRange(10).subscribe(orderList => {
          this.orders = orderList;
          this.isDataLoaded = true;
        })
      } else {
        this.orderProdservice.getAllOrdersByUserIdAndRange(user.id,10).subscribe(orderList => {
          this.orders = orderList;
          this.isDataLoaded = true;
        })
      }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
