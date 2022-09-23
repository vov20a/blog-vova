import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { getCommentsFromLS } from '../utils';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (mode) => {
  const { data } = await axios.get(`/posts/?mode=${mode}`);

  return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});
export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => await axios.delete(`/posts/${id}`),
);
export const fetchRemoveComment = createAsyncThunk(
  'posts/fetchRemoveComment',
  async (id) => await axios.delete(`/comments/${id}`),
);

const { items } = getCommentsFromLS();

const initialState = {
  posts: {
    items,
    status: 'loading',
    mode: 0,
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setMode(state, action) {
      state.posts.mode = action.payload;
    },
    addComment(state, action) {
      state.comments.items = [...state.comments.items, action.payload];
    },
  },
  extraReducers: {
    //get posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //get tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    //get commentss
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
    //remove post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    //remove comment
    [fetchRemoveComment.pending]: (state, action) => {
      state.comments.items = state.comments.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
export const { setMode, addComment } = postsSlice.actions;
