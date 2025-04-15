import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        toggleWishlist:(state,action)=>{
            const index=state.findIndex(item=>item.id===action.payload.id)
            if (index>=0){
                state.splice(index,1)
            }
            else{
                state.push(action.payload);
            }
        },
        removeFromwishlist:(state,action)=>{
            return state.filter(item=>item.id!==action.payload.id)
        }
    }
});
export const {toggleWishlist,removeFromwishlist}=wishlistSlice.actions;
export const wishlistReducer=wishlistSlice.reducer