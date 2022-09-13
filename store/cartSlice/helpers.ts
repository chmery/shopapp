import { SliceState } from "./cartSlice";

export const calcCartItemsNum = (state: SliceState) => {
    const cartItemsNum = state.cartItems.reduce(
        (total, cartItem) => (total += cartItem.quantity),
        0
    );

    return cartItemsNum;
};
