import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,
    updatedProduct:null,
}

export const updateProduct=createAsyncThunk("/admin/update/product",async (formdata)=>{
    try {
        let id=formdata.get("id")
        let response= await axios.put(`/admin/product/${id}`,formdata,{withCredentials:true}, {
            "Content-Type": "multipart/form-data",
          });
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const updateProductSlice=createSlice({
    name:"updateProductSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(updateProduct.fulfilled, (state,action) => {
            state.isLoading = false;
            state.updatedProduct=action.payload?.success?action.payload?.updatedProduct:null;
          })
        .addCase(updateProduct.rejected, (state) => {
            state.isLoading = false;
            state.updatedProduct=null
          })
    }
})

export default updateProductSlice.reducer