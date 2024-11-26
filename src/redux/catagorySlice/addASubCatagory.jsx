import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    createdSubCatagory:null,
}

export const createASubCatagory=createAsyncThunk("/sub-catagory/new",async (formData)=>{
    try {
        let response= await axios.post("/sub-catagory/new",formData,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
export const getAllSubCatagory=createAsyncThunk("/sub-catagory/get-all",async ()=>{
    try {
        let response= await axios.get("/sub-catagory/get-all");
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const createSubCatagorySlice=createSlice({
    name:"createSubCatagorySlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createASubCatagory.pending, (state) => {
            state.loading = true;
          })
        .addCase(createASubCatagory.fulfilled, (state,action) => {
            state.loading = false;
          })
        .addCase(createASubCatagory.rejected, (state) => {
            state.loading = false;
            state.createdSubCatagory=null
          })
        .addCase(getAllSubCatagory.pending, (state) => {
            state.loading = true;
          })
        .addCase(getAllSubCatagory.fulfilled, (state,action) => {
            state.loading = false;
            state.createdSubCatagory=action.payload?.success?action.payload?.allSubCatagories:null;
          })
        .addCase(getAllSubCatagory.rejected, (state) => {
            state.loading = false;
            state.createdSubCatagory=null
          })
    }
})

export default createSubCatagorySlice.reducer