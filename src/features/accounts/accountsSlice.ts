import AccountsService from "@/services/accounts.services";
import Account, { InputAccount } from "@/types/accounts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Account[] = [];

export const getAccountById =  createAsyncThunk('accounts/getById', async (id: number, thunkApi) => {
  const getAccountById = await new AccountsService().getAccountById(id);
  return getAccountById;
});

export const getAccount = createAsyncThunk('accounts/get', async (thunkApi) => {
  const getAccount = await new AccountsService().getAccount();
  return getAccount;
});

export const updateAccount = createAsyncThunk('account/update', async ({id, data} : {id: number, data: InputAccount}, thunkApi) => {
  const updateAccount = await new AccountsService().updateAccount(id, data);
  return updateAccount;
});

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAccountById.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        state.push(data);
      }
      return state;
    });

    builder.addCase(getAccount.fulfilled, (state, action) => {
      if (action.payload) {
        const data = action.payload;
        data.forEach((e) => {
          state.push(e);
        });
      }
      return state;
    });

    builder.addCase(updateAccount.fulfilled, (state, action) => {
      if(action.payload) {
        const data = action.payload;
        const accountIndex = state.findIndex(x => x.id === data.id);
        if (accountIndex !== -1) {
          state[accountIndex] = {...state[accountIndex], ...data}
        }
      }
      return state;
    })

  },
});

export default accountSlice.reducer;