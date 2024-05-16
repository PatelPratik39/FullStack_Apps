import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { userSlice } from "./usersSlice";

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: userSlice.reducer
  }
});

export default store;
