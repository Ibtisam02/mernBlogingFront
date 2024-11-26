import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
}

export const uploadPoster=createAsyncThunk("admin/upload-poster", async (formData,{rejectWithValue})=>{

    try {
        let response=await axios.post("/admin/upload-poster",formData,{withCredentials:true});
        return response.data;
    } catch (error) {
        rejectWithValue(error)
    }
})

const posterSlice=createSlice({
    name:"posterSlice",
    initialState,
    reducers:{
        setUser: (state, action) => {},
    },
    extraReducers:(builder)=>{
        builder
        .addCase(uploadPoster.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(uploadPoster.fulfilled, (state) => {
            state.isLoading = false;
          })
        .addCase(uploadPoster.rejected, (state) => {
            state.isLoading = false;
          })
    }
})

export const { setUser } = posterSlice.actions;
export default posterSlice.reducer;