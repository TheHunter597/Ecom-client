import fetchClient from "@/utils/functions/fetchClient";
import { ICartItem } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ICartState {
  status?: "idle" | "loading" | "failed";
  error: string | null;
  products: ICartItem[];
  totalPrice: number;
}

let initalCartState: ICartState = {
  products: [],
  error: null,
  status: "idle",
  totalPrice: 0,
};
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response: any = await fetchClient({
      url: "/api/v1/cart/",
      method: "get",
      withToken: true,
      withCredentials: true,
    });
    return response.data.cart.products;
  }
);
let cartSlice = createSlice({
  name: "cart",
  initialState: initalCartState,
  reducers: {
    initializeCart: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
    incrementQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity < 20) {
            item.quantity++;
            state.totalPrice += item.product.price;
          }
        }
        return item;
      });
    },
    decreaseQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity--;
            state.totalPrice -= item.product.price;
          }
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      let product = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );

        state.totalPrice -= product.product.price * action.payload.quantity;
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.products = action.payload;
      state.totalPrice = action.payload.reduce(
        (res: number, current: ICartItem) =>
          res + current.product.price * current.quantity,
        0
      );
    });
  },
});

export let {
  addToCart,
  removeFromCart,
  initializeCart,
  decreaseQuantity,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
export let currentQuantity = (id: string) => (state: RootState) =>
  state.cart.products.find((item) => item.id === id)?.quantity;
export let TotalPrice = (state: RootState) => state.cart.totalPrice;
