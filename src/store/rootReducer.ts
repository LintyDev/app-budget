import userReducer from "@/features/user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;