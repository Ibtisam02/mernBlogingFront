import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    deleteLoading:false,
    message:null,
}

export const removeFromCart=createAsyncThunk("user/remove-from-cart", async (product,{rejectWithValue})=>{

    try {
        let response=await axios.put("/delete-product-from-cart",product,{withCredentials:true});
        return response.data;
    } catch (error) {
        rejectWithValue(error)
    }
})

const removeFromCartSlice=createSlice({
    name:"removeFromCartSlice",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(removeFromCart.pending, (state) => {
            state.deleteLoading = true;
          })
        .addCase(removeFromCart.fulfilled, (state,action) => {
            state.deleteLoading = false;
            state.message=action.payload?.success?action.payload?.message:null;
          })
        .addCase(removeFromCart.rejected, (state) => {
            state.deleteLoading = false;
          })
    }
})

export default removeFromCartSlice.reducer;