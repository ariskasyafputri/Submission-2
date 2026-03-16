// D:\ASAH\REACT EXPERT\forum-app - Copy\src\states\loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    showLoading: () => true,
    hideLoading: () => false,
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
