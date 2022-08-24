import {OrderItemType} from "./OrderItemType";

export type OrderType = {
    id: number,
    name: string,
    email: string,
    total: number,
    order_items: OrderItemType[]
}
