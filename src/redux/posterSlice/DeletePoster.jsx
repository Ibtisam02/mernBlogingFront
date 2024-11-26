import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
}

export const deletePoster=createAsyncThunk("admin/delete-poster", async (id)=>{

    try {
        let response=await axios.delete(`/admin/delete-poster/${id}`,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const posterDeleteSlice=createSlice({
    name:"posterDeleteSlice",
    initialState,
    reducers:{
        setUser: (state, action) => {},
    },
    extraReducers:(builder)=>{
        builder
        .addCase(deletePoster.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(deletePoster.fulfilled, (state) => {
            state.isLoading = false;
          })
        .addCase(deletePoster.rejected, (state) => {
            state.isLoading = false;
          })
    }
})

export const { setUser } = posterDeleteSlice.actions;
export default posterDeleteSlice.reducer;