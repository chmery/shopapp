import currency from "currency.js";

const SHIPPING_COST = 10;

export const calcSubTotal = (cartItems: { item: ProductData; quantity: number }[]) =>
    cartItems.reduce(
        (total, cartItem) =>
            (total += currency(cartItem.item.price).multiply(cartItem.quantity).value),
        0
    );

export const calcTotal = (subTotal: number) => currency(subTotal).add(SHIPPING_COST).value;
