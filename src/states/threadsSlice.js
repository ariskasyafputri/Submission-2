import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { showLoading, hideLoading } from './loadingSlice';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    data: [],
    filter: '',
  },
  reducers: {
    setThreads(state, action) {
      state.data = action.payload;
    },
    addThread(state, action) {
      state.data.unshift(action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    toggleVoteThreadOptimistic(state, action) {
      const { threadId, userId, type } = action.payload;
      const thread = state.data.find((t) => t.id === threadId);

      if (!thread) return;

      // Cek apakah user sudah melakukan vote yang sama sebelumnya
      const isUpvoted = thread.upVotesBy.includes(userId);
      const isDownvoted = thread.downVotesBy.includes(userId);

      // Hapus semua vote lama dari user tersebut (Bersihkan dulu)
      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

      // Logika UNVOTE: Jika klik 'up' padahal sudah 'up', atau klik 'down' padahal sudah 'down'
      // Maka biarkan kosong (sudah difilter di atas).
      // Jika tidak, baru tambahkan vote baru.
      if (type === 'up' && !isUpvoted) {
        thread.upVotesBy.push(userId);
      } else if (type === 'down' && !isDownvoted) {
        thread.downVotesBy.push(userId);
      }
    },
  },
});

export const {
  setThreads,
  addThread,
  setFilter,
  toggleVoteThreadOptimistic,
} = threadsSlice.actions;

export const asyncFetchThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const [{ data: threadsData }, { data: usersData }] = await Promise.all([api.getThreads(), api.getUsers()]);

    const { threads } = threadsData;
    const { users } = usersData;

    const merged = threads.map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));

    dispatch(setThreads(merged));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncCreateThread = (payload) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const { data } = await api.createThread(payload);
    dispatch(addThread(data.thread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleVoteThread = ({ threadId, type }) => async (dispatch, getState) => {
  const authUser = getState().auth.user;

  if (!authUser) {
    alert('Login dulu');
    return;
  }

  const userId = authUser.id;
  const thread = getState().threads.data.find((t) => t.id === threadId);

  // Tentukan aksi untuk API
  let finalType = type;
  if (type === 'up' && thread.upVotesBy.includes(userId)) {
    finalType = 'neutral';
  } else if (type === 'down' && thread.downVotesBy.includes(userId)) {
    finalType = 'neutral';
  }

  // Update UI dulu biar kerasa cepet
  dispatch(toggleVoteThreadOptimistic({ threadId, userId, type }));

  try {
    await api.toggleVoteThread(threadId, finalType);
  } catch (error) {
    alert(error.message);
    // Jika gagal, ambil ulang data dari server untuk sinkronisasi balik
    dispatch(asyncFetchThreads());
  }
};

export default threadsSlice.reducer;
