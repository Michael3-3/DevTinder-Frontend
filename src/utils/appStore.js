//here we configure the app store using the redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import feedSlice from './feedSlice.js';
import connectionRequestSlice from './connectionRequestSlice.js';
import connectionSlice from './connectionSlice.js'

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connectionRequest: connectionRequestSlice,
    connection: connectionSlice,
  },
});

export default appStore;