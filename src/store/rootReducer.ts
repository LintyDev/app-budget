import userReducer from "@/features/user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import accountsReducer from "@/features/accounts/accountsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  accounts: accountsReducer
});

export default rootReducer;