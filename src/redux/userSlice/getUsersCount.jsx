import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    usersCount:null,
}

export const getUsersCount=createAsyncThunk("/admin/get-users-length",async ()=>{
    try {
        let response= await axios.get("/admin/get-users-length",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getUsersCountSlice=createSlice({
    name:"getUsersCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUsersCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getUsersCount.fulfilled, (state,action) => {
            state.loading = false;
            state.usersCount=action.payload?.success?action.payload?.users:null;
          })
        .addCase(getUsersCount.rejected, (state) => {
            state.loading = false;
            state.usersCount=null
          })
    }
})

export default getUsersCountSlice.reducer