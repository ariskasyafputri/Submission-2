// D:\ASAH\REACT EXPERT\forum-app - Copy\src\app\store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/authSlice';
import threadsReducer from '../states/threadsSlice';
import threadDetailReducer from '../states/threadDetailSlice';
import leaderboardReducer from '../states/leaderboardSlice';
import loadingReducer from '../states/loadingSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboard: leaderboardReducer,
    loading: loadingReducer,
  },
});
