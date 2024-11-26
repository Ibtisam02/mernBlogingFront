import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    users:null,
}

export const getUsers=createAsyncThunk("/admin/get-users",async ()=>{
    try {
        let response= await axios.get("/admin/users",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getUsersSlice=createSlice({
    name:"getUsersSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUsers.pending, (state) => {
            state.loading = true;
          })
        .addCase(getUsers.fulfilled, (state,action) => {
            state.loading = false;
            state.users=action.payload?.success?action.payload?.users:null;
          })
        .addCase(getUsers.rejected, (state) => {
            state.loading = false;
            state.users=null
          })
    }
})

export default getUsersSlice.reducer