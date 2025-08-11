// this is the user slice file where we manage user state
import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: null,
    reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return null;
    }
    }
});

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;