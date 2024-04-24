import AccountsService from "@/services/accounts.services";
import CategoriesService from "@/services/categories.services";
import Account, { AccountState, InputAccount } from "@/types/accounts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AccountState[] = [];

export const getAccountById =  createAsyncThunk('accounts/getById', async (id: number, thunkApi) => {
  const getAccountById = await new AccountsService().getAccountById(id);
  if (getAccountById) {
    const acc: AccountState = {...getAccountById, allocatedRemainingAmount: 0}
    return acc;
  }
  return null;
});

export const getAccount = createAsyncThunk('accounts/get', async (thunkApi) => {
  const getAccount = await new AccountsService().getAccount();
  if (!getAccount) {
    return null;
  }
  for (const a of [...getAccount as AccountState[]]) {
    const countAllocated = await new CategoriesService().countAllocated(a.id);
    a.allocatedRemainingAmount = a.initalAmount;
    if (countAllocated && countAllocated.allAmountAllocated !== null) {
      a.allocatedRemainingAmount = a.initalAmount - countAllocated.allAmountAllocated
    }
  };
  const accountState : AccountState[] = [...getAccount as AccountState[]];
  return accountState;
});

export const updateAccount = createAsyncThunk('account/update', async ({id, data} : {id: number, data: InputAccount}, thunkApi) => {
  const updateAccount = await new AccountsService().updateAccount(id, data);
  if (!updateAccount) {
    return null;
  }
  const countAllocated = await new CategoriesService().countAllocated(updateAccount.id);
  if (countAllocated) {
    const acc : AccountState = {...updateAccount, allocatedRemainingAmount: updateAccount.initalAmount}
    if (countAllocated.allAmountAllocated !== null) {
      acc.allocatedRemainingAmount = acc.initalAmount - countAllocated.allAmountAllocated;
    }
    return acc;
  }
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