import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    message:null,
}

export const forgetPassword=createAsyncThunk("/password/forget",async (data)=>{
    try {
        let response= await axios.post("/password/forgot",data,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const forgetPasswordSlice=createSlice({
    name:"forgetPasswordSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(forgetPassword.pending, (state) => {
            state.loading = true;
          })
        .addCase(forgetPassword.fulfilled, (state,action) => {
            state.loading = false;
            state.message=action.payload?.success?action.payload?.message:null;
          })
        .addCase(forgetPassword.rejected, (state) => {
            state.loading = false;
            state.message=null
          })
    }
})

export default forgetPasswordSlice.reducer