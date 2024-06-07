import { createSlice } from "@reduxjs/toolkit";
import { profile } from "console";

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
    phone_number: "",
    zip_code: "",
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
    setZipCode: (state, action) => {
      if (
        action.payload.length <= 10 &&
        (/^[0-9]+$/.test(action.payload) || action.payload == "")
      )
        state.zip_code = action.payload;
    },
    setPhoneNumber: (state, action) => {
      if (
        action.payload.length <= 15 &&
        (/^[0-9]+$/.test(action.payload) || action.payload == "")
      )
        state.phone_number = action.payload;
    },
    editProfileLoadData: (state, action) => {
      state.first_name = action.payload.firstName;
      state.last_name = action.payload.lastName;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.zip_code = action.payload.zip_code;
      state.phone_number = action.payload.phone_number;
      state.state = action.payload.state;
      state.address = action.payload.address;
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
  setZipCode,
  setPhoneNumber,
  editProfileLoadData,
} = userSlice.actions;
export default userSlice.reducer;
