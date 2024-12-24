import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    noOfItems:null,
}

export const getNoOfItemsInCart=createAsyncThunk("user/get-no-of-items-in-cart", async ()=>{

    try {
        let response=await axios.get("/user/get-no-of-products",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
})

const getNoOfItemsInCartSlice=createSlice({
    name:"getNoOfItemsInCartSlice",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getNoOfItemsInCart.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(getNoOfItemsInCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.noOfItems=action.payload?.success?action.payload?.productsInCart:null;
          })
        .addCase(getNoOfItemsInCart.rejected, (state) => {
            state.isLoading = false;
          })
    }
})

export default getNoOfItemsInCartSlice.reducer;