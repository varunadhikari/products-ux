export interface OrderDetail{
    id? :number;
    productId :number;
    quantity :number;
    totalAmount :number;
    name? : string;
    company? : string;
    description? : string;
    price? :number;
}