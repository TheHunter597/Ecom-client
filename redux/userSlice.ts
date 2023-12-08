import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData.firstName = action.payload.first_name;
      state.userData = action.payload.last_name;
      state.userData = action.payload.email;
      state.userData = action.payload.id;
    },
    changeIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setUserData, changeIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
