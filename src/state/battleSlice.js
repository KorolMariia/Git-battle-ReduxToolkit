import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPlayer, fetchBattle } from '../api/api';

export const getPlayer = createAsyncThunk(
  'battle/getPlayer',
  async ({ username }) => {
    const data = await fetchPlayer(username);
    return data;
  },
);

export const getBattle = createAsyncThunk(
  'battle/getBattle',
  async (players) => {
    const data = await fetchBattle(players);
    return data;
  },
);

const initialState = {
  playersIds: ['1', '2'],
  loadingPlayer: { 1: false, 2: false },
  initialStatePlayers: {
    1: { username: '', avatar: null },
    2: { username: '', avatar: null },
  },
  errorPlayer: { 1: null, 2: null },
  loadingBattle: false,
  resultsBattle: [],
  errorBattle: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    handleReset: (state, action) => {
      const id = action.payload;
      state.initialStatePlayers[id].username = '';
      state.initialStatePlayers[id].avatar = null;
      state.errorPlayer[id] = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: true };
        state.errorPlayer = { [id]: null };
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: false };
        state.initialStatePlayers[id].username = action.payload.login;
        state.initialStatePlayers[id].avatar = action.payload.avatar_url;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        const { id } = action.meta.arg;
        state.loadingPlayer = { [id]: false };
        state.errorPlayer = { [id]: 'Not Found' };
      })
      .addCase(getBattle.pending, (state) => {
        state.loadingBattle = true;
        state.resultsBattle = [];
        state.errorBattle = null;
      })
      .addCase(getBattle.fulfilled, (state, action) => {
        state.loadingBattle = false;
        state.resultsBattle = action.payload;
        state.errorBattle = null;
      })
      .addCase(getBattle.rejected, (state, action) => {
        state.loadingBattle = false;
        state.resultsBattle = [];
        state.errorBattle = action.payload;
      });
  },
});

export const { handleReset } = battleSlice.actions;

export default battleSlice.reducer;
