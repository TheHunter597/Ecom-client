import formatCardNumber from "@/utils/functions/cardNumberFormatter";
import { createSlice } from "@reduxjs/toolkit";

let checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    cardholderName: "",
    cardNumber: "",
    expiryYear: "",
    expiryMonth: "",
    cvc: "",
  },
  reducers: {
    setCardholderName: (state, action) => {
      if (
        action.payload.length <= 26 &&
        (/^[a-zA-Z\s]*$/.test(action.payload) || action.payload == "")
      )
        state.cardholderName = action.payload.toUpperCase();
    },
    setCardNumber: (state, action) => {
      if (
        action.payload.length <= 19 &&
        (/^[0-9\s]*$/.test(action.payload) || action.payload == "")
      ) {
        state.cardNumber = formatCardNumber(action.payload);
      }
    },
    setExpiryYear: (state, action) => {
      if (
        action.payload <= 2030 &&
        (/^[0-9]+$/.test(action.payload) || action.payload == "")
      ) {
        state.expiryYear = action.payload;
      }
    },
    setExpiryMonth: (state, action) => {
      if (
        action.payload <= 12 &&
        (/^[0-9]+$/.test(action.payload) || action.payload == "")
      ) {
        state.expiryMonth = action.payload;
      }
    },
    setCVC: (state, action) => {
      if (/^[0-9]+$/.test(action.payload) || action.payload == "") {
        state.cvc = action.payload;
      }
    },
  },
});

export let {
  setCardholderName,
  setCardNumber,
  setExpiryYear,
  setExpiryMonth,
  setCVC,
} = checkOutSlice.actions;
export default checkOutSlice.reducer;
