import { NumericLiteral } from "typescript";

export interface Tabledata {
    id: number;
    name: string;
    brand: string;
    code?: string;
    batch?: string;
    mfgdate?: Date;
    expiryDate?: Date;
    price: number;
    dealerPrice?: number;
    mrp?: number;
    availablequantity: number;
    quantity?: number;
    check: boolean ;
  }