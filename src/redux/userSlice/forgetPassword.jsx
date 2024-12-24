import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    message:null,
}

export const resetPassword=createAsyncThunk("/password/reset",async (data)=>{
    try {
        let response= await axios.put(`/password/reset/${data.token}`,data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const resetPasswordSlice=createSlice({
    name:"resetPasswordSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
          })
        .addCase(resetPassword.fulfilled, (state,action) => {
            state.loading = false;
            state.message=action.payload?.success?action.payload?.message:null;
          })
        .addCase(resetPassword.rejected, (state) => {
            state.loading = false;
            state.message=null
          })
    }
})

export default resetPasswordSlice.reducer