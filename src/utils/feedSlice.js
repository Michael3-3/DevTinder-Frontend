// this is the slice to handle feed related state
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    clearFeed: () => {
      return null;
    },
    removeFeed: (state, action) => {
      return state.filter(
        (req) => req._id.toString() !== action.payload.toString()
      );
    },
  },
});

export const { setFeed, clearFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
