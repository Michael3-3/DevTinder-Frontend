// in this slice we have all the connection of the user

import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {},
  reducers: {
    setConnection(state, action) {
      return action.payload;
    },
    removeConnectionRequest: (state, action) => {
      return state.filter(
        (req) => req._id.toString() !== action.payload.toString()
      );
    },
    clearConnection(){
        return {}
    }
  },
});

export default connectionSlice.reducer;
export const { setConnection, removeConnectionRequest, clearConnection } = connectionSlice.actions;