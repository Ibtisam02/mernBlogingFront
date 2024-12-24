import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    message:null,
}

export const addToCart=createAsyncThunk("user/add-to-cart", async (product,{rejectWithValue})=>{

    try {
        let response=await axios.post("/add-to-cart",product,{withCredentials:true});
        return response.data;
    } catch (error) {
        rejectWithValue(error)
    }
})

const addToCartSlice=createSlice({
    name:"addToCartSlice",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.message=action.payload?.success?action.payload?.message:null;
          })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
          })
    }
})

export default addToCartSlice.reducer;