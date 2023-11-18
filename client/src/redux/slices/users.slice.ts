import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData, IUrlParams } from "./types";
import axios from "../../utils/axios";

export const getOne = createAsyncThunk(
  "users/getOne",
  async (params: IUrlParams) => {
    const { data } = await axios.get(`users/${params.id}/${params.username}`);
    console.log(data);

    return data;
  },
);

const initialState: IData = {
  data: null,
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(getOne.rejected, state => {
      state.data = null;
      state.status = "rejected";
    });
  },
});

export const { actions, reducer } = usersSlice;
