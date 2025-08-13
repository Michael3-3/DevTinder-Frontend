// this slice is to handle all the input request to the user
import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: "connectionRequest",
  initialState: [], // ✅ Start with empty array
  reducers: {
    setConnectionRequest: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : []; // ✅ Always array
    },
    clearConnectionRequest: () => {
      return [];
    },
    removeConnectionRequest: (state, action) => {
      return state.filter(
        (req) => req._id.toString() !== action.payload.toString()
      );
    },
  },
});

export const { setConnectionRequest, clearConnectionRequest ,removeConnectionRequest} =
  connectionRequestSlice.actions;
export default connectionRequestSlice.reducer; // ✅ export reducer, not slice
