import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "./reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";


const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    }

};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);

            if (index !== -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);
            state.loading = false;
        },

        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(
                (i) => i.productId !== action.payload
            );
            state.loading = false;
        },
        // subtotal syntax detected........................................................................................................
        calculatePrice: (state) => {
            const subtotal = state.cartItems.reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
            console.log("subtotal",subtotal);
        },

        // setSubTotal: (state, action: PayloadAction<number>) => {
        //     state.subtotal = action.payload*state.subtotal;
        // },

        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => {
            initialState
        },

    },
});


export const { addToCart,
    // addToOneTimeOrder,
    // addToSubscription,
    // setSubTotal,
    removeCartItem,
    calculatePrice,
    discountApplied,
    saveShippingInfo, resetCart } = cartReducer.actions;