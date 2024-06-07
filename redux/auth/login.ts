import { createSlice } from "@reduxjs/toolkit";

interface UserCreationData {
  email: string;
  password: string;
}

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setUserLoginEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserLoginPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { setUserLoginEmail, setUserLoginPassword } =
  userLoginSlice.actions;
export default userLoginSlice.reducer;
