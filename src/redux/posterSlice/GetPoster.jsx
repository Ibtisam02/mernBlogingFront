import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    posters:null,
}

export const getPosters=createAsyncThunk("/getPosters",async ()=>{
    try {
        let response= await axios.get("/get-posters");
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getPosterslice=createSlice({
    name:"getPosterSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getPosters.pending, (state) => {
            state.loading = true;
          })
        .addCase(getPosters.fulfilled, (state,action) => {
            state.loading = false;
            state.posters=action.payload.success?action.payload?.getAllPosters:null;
          })
        .addCase(getPosters.rejected, (state) => {
            state.loading = false;
            state.posters=null
          })
    }
})

export default getPosterslice.reducer