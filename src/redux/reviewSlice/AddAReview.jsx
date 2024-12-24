import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  loadingForAddReview: false,
  review: null,
};

export const addReview = createAsyncThunk(
  "user/add-review",
  async (data) => {
    try {
      let response = await axios.put("/review",data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const addReviewSlice = createSlice({
  name: "addReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addReview.pending,(state)=>{
        state.loadingForAddReview=true
    })
    .addCase(addReview.fulfilled,(state,action)=>{
        state.loadingForAddReview=false,
        state.review=action.payload?.success?action.payload?.success:null;
    })
    .addCase(addReview.rejected,(state)=>{
        state.loadingForAddReview=false,
        state.review=null
    })
  },
});
export default addReviewSlice.reducer
