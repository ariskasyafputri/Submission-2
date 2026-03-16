// D:\ASAH\REACT EXPERT\forum-app - Copy\src\states\leaderboardSlice.js
import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { showLoading, hideLoading } from './loadingSlice';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    setLeaderboard: (state, action) => action.payload,
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;

export const asyncFetchLeaderboard = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const response = await api.getLeaderboard();
    // Struktur API Dicoding: response.data.leaderboards
    dispatch(setLeaderboard(response.data.leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default leaderboardSlice.reducer;
