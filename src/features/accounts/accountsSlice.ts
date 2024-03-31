import AccountsService from "@/services/accounts.services";
import Account, { InputAccount } from "@/types/accounts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Account[] = [];

export const createAccount = createAsyncThunk('accounts/create', async (data: InputAccount, thunkAPi) => {
  const createAcc = await new AccountsService().createAccount(data);
  return createAcc;
});

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
});

export default accountSlice.reducer;