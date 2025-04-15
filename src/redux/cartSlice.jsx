import { createSlice } from '@reduxjs/toolkit'
import React from 'react'


const initialState={
    cartItems:[],
    totalPrice:0,
    totalQty:0,
    cartCount:null
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
      addtoCart: (state, action) => {
        const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (existingIndex >= 0) {
          state.cartItems[existingIndex].quantity += 1;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
      ,
        removefromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(item=>item.id!==action.payload.id)
            state.totalPrice-=action.payload.price
        },
        clearCart:(state)=>{
            state.cartItems=[];
            state.totalPrice=0;
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload
            );
      
            if (itemIndex >= 0) {
              if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
              } else {
                // Remove item if quantity is 1
                state.cartItems.splice(itemIndex, 1);
              }
            }
      
            state.totalPrice = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          },
          increaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload
            );
          
            if (itemIndex >= 0) {
              state.cartItems[itemIndex].quantity += 1;
            }
          
            state.totalPrice = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          },
    }
})
export const {addtoCart,removefromCart,decreaseQuantity,increaseQuantity,clearCart}=cartSlice.actions;
export const cartReducer= cartSlice.reducer;