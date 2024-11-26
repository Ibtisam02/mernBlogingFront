import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    createdCatagory:null,
}

export const createACatagory=createAsyncThunk("/catagory/add-new",async (formData)=>{
    try {
        let response= await axios.post("/catagory/new",formData,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
export const getAllCatagories=createAsyncThunk("/catagory/get-all",async ()=>{
    try {
        let response= await axios.get("/catagory/get-all");
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const createCatagorySlice=createSlice({
    name:"createCatagorySlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createACatagory.pending, (state) => {
            state.loading = true;
          })
        .addCase(createACatagory.fulfilled, (state,action) => {
            state.loading = false;
          })
        .addCase(createACatagory.rejected, (state) => {
            state.loading = false;
            state.createdCatagory=null
          })
        .addCase(getAllCatagories.pending, (state) => {
            state.loading = true;
          })
        .addCase(getAllCatagories.fulfilled, (state,action) => {
            state.loading = false;
            state.createdCatagory=action.payload?.success?action.payload?.allCatagories:null;
          })
        .addCase(getAllCatagories.rejected, (state) => {
            state.loading = false;
            state.createdCatagory=null
          })
    }
})

export default createCatagorySlice.reducer