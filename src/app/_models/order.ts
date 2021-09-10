import { OrderDetail } from "./order.detail";

export interface Order{
    id?  : number;
    userId: string;
    orderDate: Date;
    status : string;
    totalAmount : number;
    tax : number;
    orderDetailList : OrderDetail[];
}