import { createSlice } from "@reduxjs/toolkit";

interface UserCreationData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  interests: number[];
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    interests: [],
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserConfirmPassword: (state, action) => {
      state.confirm_password = action.payload;
    },
    setUserFirstName: (state, action) => {
      state.first_name = action.payload;
    },
    setUserLastName: (state, action) => {
      state.last_name = action.payload;
    },
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserCity: (state, action) => {
      state.city = action.payload;
    },
    setUserState: (state, action) => {
      state.state = action.payload;
    },
    setUserCountry: (state, action) => {
      state.country = action.payload;
    },
    addCategory: (state, action) => {
      // @ts-ignore
      state.interests.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.interests = state.interests.filter(
        (category) => category !== action.payload
      );
    },
  },
});
export const {
  setUserEmail,
  setUserPassword,
  setUserConfirmPassword,
  setUserFirstName,
  setUserLastName,
  setUserAddress,
  setUserCity,
  setUserCountry,
  setUserState,
  addCategory,
  removeCategory,
} = userSlice.actions;
export default userSlice.reducer;
