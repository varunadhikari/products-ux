import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "@app/_models/order";
import { Product } from "@app/_models/product";
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderProductService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    getAllProducts(){
        return this.http.get<Product[]>(`${environment.apiUrl}/external/product/all`);
    }

    saveProduct(product: Product) {
        return this.http.post(`${environment.apiUrl}/external/product`, product);
    }

    saveOrder(order: Order) {
        return this.http.post(`${environment.apiUrl}/external/order`, order);
    }

    getOrderSummary(id: number){
        return this.http.get<Order>(`${environment.apiUrl}/external/order/${id}`);
    }

    getAllOrders(){
        return this.http.get<Order[]>(`${environment.apiUrl}/external/order/all`);
    }

    getAllOrdersByUserId(id: string){
        return this.http.get<Order[]>(`${environment.apiUrl}/external/order/user/${id}`);
    }
}