import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    updatedStatus:null,
}

export const updateOrderStatus=createAsyncThunk("/admin/update-ordersStatus",async(data)=>{
    console.log(data)
    try {
        let response= await axios.put(`/admin/order/${data?.id}`,{status:data?.status},{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const updateOrderSlice=createSlice({
    name:"updateOrderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updateOrderStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateOrderStatus.fulfilled, (state,action) => {
            state.loading = false;
            state.updatedStatus=action.payload?.success?action.payload?.success:null;
          })
        .addCase(updateOrderStatus.rejected, (state) => {
            state.loading = false;
            state.updatedStatus=null
          })
    }
})

export default updateOrderSlice.reducer