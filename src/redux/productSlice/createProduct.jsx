import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  loading: false,
  uploadedProduct: null,
};

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (data) => {
    try {
      let response = await axios.post("/admin/product/new",data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending,(state)=>{
        state.loading=true
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
        state.loading=false,
        state.uploadedProduct=action.payload?.success?action.payload?.product:null;
    })
    .addCase(createProduct.rejected,(state)=>{
        state.loading=false,
        state.uploadedProduct=null
    })
  },
});
export default addProductSlice.reducer
