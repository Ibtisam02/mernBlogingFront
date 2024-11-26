import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    products:null,
}

export const searchProductsOrFilter=createAsyncThunk("/search/filter/prducts",async (obj)=>{
    try {

          let a=Object.keys(obj);
          let b=Object.values(obj);
          let str="/products?";
            a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})

        let response= await axios.get(str);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const searchProductsOrFilterSlice=createSlice({
    name:"searchProductsOrFilterSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(searchProductsOrFilter.pending, (state) => {
            state.loading = true;
          })
        .addCase(searchProductsOrFilter.fulfilled, (state,action) => {
            state.loading = false;
            state.products=action.payload.success?action.payload?.products:null;
          })
        .addCase(searchProductsOrFilter.rejected, (state) => {
            state.loading = false;
            state.products=null
          })
    }
})

export default searchProductsOrFilterSlice.reducer