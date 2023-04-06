import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPopularRepos } from '../api/api';

export const getPopularRepos = createAsyncThunk(
  'popular/getRepos',
  async ({ selectedLanguage, searchName }) => {
    const data = await fetchPopularRepos(selectedLanguage, searchName);
    return data;
  },
);

const initialState = {
  languages: ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'],
  selectedLanguage: 'all',
  searchName: '',
  loading: false,
  repos: [],
  error: null,
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPopularRepos.pending, (state) => {
        state.loading = true;
        state.repos = [];
        state.error = null;
      })
      .addCase(getPopularRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
        state.error = null;
      })
      .addCase(getPopularRepos.rejected, (state, action) => {
        state.loading = false;
        state.repos = [];
        state.error = action.payload;
      });
  },
});

export const { setLanguage, setSearchName } = popularSlice.actions;

export default popularSlice.reducer;
