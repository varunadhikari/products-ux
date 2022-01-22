import { NumericLiteral } from "typescript";

export interface Tabledata {
    id: number;
    name: string;
    brand: string;
    price: number;
    availablequantity: number;
    quantity?: number;
    check: boolean ;
  }