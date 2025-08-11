//here we configure the app store using the redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import feedSlice from './feedSlice.js';


const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});

export default appStore;