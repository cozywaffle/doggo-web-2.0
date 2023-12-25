import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData, IUrlParams, Status } from "./types";
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
  status: Status.idle,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.fulfilled;
    });
    builder.addCase(getOne.rejected, state => {
      state.data = null;
      state.status = Status.rejected;
    });
  },
});

export const { actions, reducer } = usersSlice;
