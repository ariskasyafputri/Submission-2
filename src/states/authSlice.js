import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { showLoading, hideLoading } from './loadingSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isPreload: true,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isPreload = false;
    },
    unsetAuthUser: (state) => {
      state.user = null;
      state.isPreload = false;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authSlice.actions;

export const asyncLogin = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const { data } = await api.login({ email, password });
    api.putAccessToken(data.token);
    const profile = await api.getOwnProfile();
    dispatch(setAuthUser(profile.data.user));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncRegister = (payload) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register(payload);
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncPreload = () => async (dispatch) => {
  dispatch(showLoading());
  const token = api.getAccessToken();
  if (!token) {
    dispatch(unsetAuthUser());
    dispatch(hideLoading());
    return;
  }
  try {
    const { data } = await api.getOwnProfile();
    dispatch(setAuthUser(data.user));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unsetAuthUser());
  api.putAccessToken(''); // Hapus token dari localStorage
};

export default authSlice.reducer;
