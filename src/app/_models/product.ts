export interface Product{
    id?:number;
	name:string;
	company:string;code?: string;
    batch?: string;
    mfgDate?: Date;
    expiryDate?: Date;
    price: number;
    dealerPrice?: number;
    mrp?: number;
	description:string;
	quantity:number;
}