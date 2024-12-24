import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  loadingForGetReviews: false,
  reviews: null,
};

export const getAllReviews = createAsyncThunk(
  "user/get-reviews",
  async (data) => {
    try {
        
      let response = await axios.get("/get/reviews");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const getAllReviewsSlice = createSlice({
  name: "getAllReviewsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllReviews.pending,(state)=>{
        state.loadingForGetReviews=true
    })
    .addCase(getAllReviews.fulfilled,(state,action)=>{
        state.loadingForGetReviews=false,
        state.reviews=action.payload?.success?action.payload?.reviews:null;
    })
    .addCase(getAllReviews.rejected,(state)=>{
        state.loadingForGetReviews=false,
        state.reviews=null
    })
  },
});
export default getAllReviewsSlice.reducer