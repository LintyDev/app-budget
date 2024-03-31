import UserService from "@/services/user.services";
import { InputUser, UserState } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  name: null,
  avatarId: null
}

export const createUser = createAsyncThunk('user/create', async (data: InputUser, thunkApi) => {
  const user = await new UserService().createUser(data);
  if (user) {
    return data;
  }
  return user;
});

export const userChecking = createAsyncThunk('user/check', async (thunkAPi) => {
  const check = await new UserService().checkUser();
  if (check) {
    return check;
  } else {
    return false;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.name = action.payload.name;
        state.avatarId = action.payload.avatarId;
      } else {
        state.name = null;
        state.avatarId = null;
      }
      return state;
    });

    builder.addCase(userChecking.fulfilled, (state, action) => {
      if (action.payload) {
        state.name = action.payload.name;
        state.avatarId = action.payload.avatarId;
      } else {
        state.name = null;
        state.avatarId = null;
      }
      return state;
    });
  },
});

export default userSlice.reducer;