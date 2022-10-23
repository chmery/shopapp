import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calcCartItemsNum } from "./helpers";

export type SliceState = {
    cartItems: {
        item: ProductData;
        quantity: number;
    }[];
    cartItemsNum: number;
};

const initialState: SliceState = { cartItems: [], cartItemsNum: 0 };

const cartSlice = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ProductData>) {
            const cartItemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.item.id === action.payload.id
            );

            const isInCart = cartItemIndex !== -1 ? true : false;

            if (isInCart) {
                const { quantity } = state.cartItems[cartItemIndex];
                if (quantity === 5) return;
                state.cartItems[cartItemIndex].quantity++;
            }

            if (!isInCart) {
                const item = {
                    item: action.payload,
                    quantity: 1,
                };
                state.cartItems.push(item);
            }

            state.cartItemsNum = calcCartItemsNum(state);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const itemToRemoveIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.item.id === action.payload
            );

            const itemToRemove = state.cartItems[itemToRemoveIndex];

            if (itemToRemove.quantity) {
                state.cartItems[itemToRemoveIndex].quantity--;
            }

            if (!itemToRemove.quantity) {
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.item.id !== action.payload
                );
            }

            state.cartItemsNum = calcCartItemsNum(state);
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartItemsNum = 0;
        },
    },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
