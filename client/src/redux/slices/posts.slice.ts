import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import * as types from "./types";

export const getAll = createAsyncThunk("posts/getAll", async () => {
  const { data } = await axios.get("posts/getall");

  return data as types.IPost[];
});

export const getOne = createAsyncThunk("posts/getOne", async id => {
  const data = await axios.get(`posts/${id}`);

  return data;
});

const initialState: types.IDataPosts = {
  data: null,
  status: types.Status.idle,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = types.Status.fulfilled;
    });
    builder.addCase(getAll.rejected, state => {
      state.data = null;
      state.status = types.Status.rejected;
    });
    builder.addCase(getAll.pending, state => {
      state.status = types.Status.pending;
    });
  },
});

export const { actions, reducer } = postsSlice;
