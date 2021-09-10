import { OrderSummaryItemData } from "./order.summary.items";

export interface OrderSummaryData{
    items : OrderSummaryItemData[];
    tax : number;
    totalPrice : number;
}