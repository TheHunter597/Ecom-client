import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import userCreationReducer from "./userCreation";
import UserLoginReducer from "./login";
const store = configureStore({
  reducer: {
    user: userReducer,
    userCreation: userCreationReducer,
    userLogin: UserLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
