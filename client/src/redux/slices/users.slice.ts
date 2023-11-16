import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData, IUrlParams } from "./types";
import axios from "../../utils/axios";

export const getOne = createAsyncThunk(
  "users/getOne",
  async (params: IUrlParams) => {
    const data = await axios.get(`users/${params.id}/${params.username}`);
    console.log(data);

    return data;
  },
);

const initialState: IData = {
  userData: null,
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.userData = action.payload.data.userData;
      state.userData!.posts = action.payload.data.posts;
    });
  },
});

export const { actions, reducer } = usersSlice;
