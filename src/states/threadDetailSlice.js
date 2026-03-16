// D:\ASAH\REACT EXPERT\forum-app - Copy\src\states\threadDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { showLoading, hideLoading } from './loadingSlice';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    setThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
  },
});

export const { setThreadDetail, clearThreadDetail } = threadDetailSlice.actions;

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetail());
  try {
    const response = await api.getThreadDetail(threadId);
    dispatch(setThreadDetail(response.data.detailThread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncCreateComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const response = await api.createComment({ threadId, content });
    if (response.status === 'success') {
      const detailRes = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(detailRes.data.detailThread));
    }
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleVoteComment = ({ threadId, commentId, type }) => async (dispatch) => {
  try {
    await api.toggleVoteComment(threadId, commentId, type);
    const response = await api.getThreadDetail(threadId);
    dispatch(setThreadDetail(response.data.detailThread));
  } catch (error) {
    alert(error.message);
  }
};

export default threadDetailSlice.reducer;
