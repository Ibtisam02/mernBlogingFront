import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    cart:null,
}

export const getCart=createAsyncThunk("user/get-cart", async ()=>{

    try {
        let response=await axios.get("/get-cart",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
})

const getCartSlice=createSlice({
    name:"getCartSlice",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCart.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(getCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cart=action.payload?.success?action.payload?.cart:null;
          })
        .addCase(getCart.rejected, (state) => {
            state.isLoading = false;
          })
    }
})

export default getCartSlice.reducer;