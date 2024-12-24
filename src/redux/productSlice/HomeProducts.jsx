import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    firstSecProducts:null,
    secondSecProducts:null,
    thirdSecProducts:null,
    fourthSecProducts:null
}

export const firstSec=createAsyncThunk("/homeSec/prducts",async (obj)=>{
    try {

          let a=Object.keys(obj);
          let b=Object.values(obj);
          let str="/products/home?";
            a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})

        let response= await axios.get(str);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

export const secondSec=createAsyncThunk("/homeSec2/prducts",async (obj)=>{
    try {

          let a=Object.keys(obj);
          let b=Object.values(obj);
          let str="/products/home?";
            a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})

        let response= await axios.get(str);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
export const thirdSec=createAsyncThunk("/homeSec3/prducts",async (obj)=>{
    try {

          let a=Object.keys(obj);
          let b=Object.values(obj);
          let str="/products/home?";
            a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})

        let response= await axios.get(str);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})


export const forthSec=createAsyncThunk("/homeSec4/prducts",async (obj)=>{
    try {

          let a=Object.keys(obj);
          let b=Object.values(obj);
          let str="/products/home?";
            a.forEach((value,i)=>{str+=`${value}=${b[i]}&`})

        let response= await axios.get(str);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
const homeProductsSlice=createSlice({
    name:"homeProductsSlice",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(firstSec.pending, (state) => {
            state.loading = true;
          })
        .addCase(firstSec.fulfilled, (state,action) => {
            state.loading = false;
            state.firstSecProducts=action.payload?.success?action.payload?.products:null;
          })
        .addCase(firstSec.rejected, (state) => {
            state.loading = false;
            state.firstSecProducts=null
          })




        .addCase(secondSec.pending, (state) => {
            state.loading = true;
          })
        .addCase(secondSec.fulfilled, (state,action) => {
            state.loading = false;
            state.secondSecProducts=action.payload?.success?action.payload?.products:null;
          })
        .addCase(secondSec.rejected, (state) => {
            state.loading = false;
            state.secondSecProducts=null
          })




        .addCase(thirdSec.pending, (state) => {
            state.loading = true;
          })
        .addCase(thirdSec.fulfilled, (state,action) => {
            state.loading = false;
            state.thirdSecProducts=action.payload?.success?action.payload?.products:null;
          })
        .addCase(thirdSec.rejected, (state) => {
            state.loading = false;
            state.thirdSecProducts=null
          })




        .addCase(forthSec.pending, (state) => {
            state.loading = true;
          })
        .addCase(forthSec.fulfilled, (state,action) => {
            state.loading = false;
            state.fourthSecProducts=action.payload?.success?action.payload?.products:null;
          })
        .addCase(forthSec.rejected, (state) => {
            state.loading = false;
            state.fourthSecProducts=null
          })
    }
})
export default homeProductsSlice.reducer