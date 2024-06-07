import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    let token: any;
    if (typeof window !== "undefined") {
      token = document.cookie
        .split(";")
        .map((item) => item.trim())
        .find((item) => item.includes("access"))
        ?.split("=")[1];
    }
    try {
      const response: any = await axios.get(
        "/api/v1/auth/checkuserauthenticated/",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.user;
    } catch (err) {
      return {};
    }
  }
);

export interface IUser {
  id: null | string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone_number: string;
  avatar: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      id: null,
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      phone_number: "",
      avatar: "",
      dateJoined: "",
    },
    isAuthenticated: false,
    isPhoneView: false,
    resetPassowrd: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    changeCurrentPassword: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData.firstName = action.payload.first_name;
      state.userData.lastName = action.payload.last_name;
      state.userData.email = action.payload.email;
      state.userData.id = action.payload.id;
      state.userData.address = action.payload.address;
      state.userData.city = action.payload.city;
      state.userData.state = action.payload.state;
      state.userData.zip_code = action.payload.zip_code;
      state.userData.country = action.payload.country;
      state.userData.phone_number = action.payload.phone_number;
      state.userData.id = action.payload.id;
    },
    changeIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    changeIsPhoneView: (state, action) => {
      state.isPhoneView = action.payload;
    },
    changeResetPasswordEmail: (state, action) => {
      state.resetPassowrd.email = action.payload;
    },
    changeResetPasswordPassword: (state, action) => {
      state.resetPassowrd.password = action.payload;
    },
    changeResetPasswordConfirmPassword: (state, action) => {
      state.resetPassowrd.confirmPassword = action.payload;
    },
    setOldPassword: (state, action) => {
      state.changeCurrentPassword.oldPassword = action.payload;
    },
    setNewPassword: (state, action) => {
      state.changeCurrentPassword.newPassword = action.payload;
    },
    setConfirmNewPassword: (state, action) => {
      state.changeCurrentPassword.confirmNewPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData.firstName = action.payload.first_name;
      state.userData.lastName = action.payload.last_name;
      state.userData.email = action.payload.email;
      state.userData.id = action.payload.id;
      state.userData.address = action.payload.address;
      state.userData.city = action.payload.city;
      state.userData.state = action.payload.state;
      state.userData.zip_code = action.payload.zip_code;
      state.userData.country = action.payload.country;
      state.userData.phone_number = action.payload.phone_number;
      state.userData.avatar = action.payload.avatar;
      state.userData.dateJoined = action.payload.date_joined;
      state.isAuthenticated = action.payload.id ? true : false;
    });
  },
});
export const {
  setUserData,
  changeIsAuthenticated,
  changeIsPhoneView,
  changeResetPasswordEmail,
  changeResetPasswordConfirmPassword,
  changeResetPasswordPassword,
  setOldPassword,
  setNewPassword,
  setConfirmNewPassword,
} = userSlice.actions;
export default userSlice.reducer;
