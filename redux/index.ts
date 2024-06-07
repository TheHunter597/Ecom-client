import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./auth/userSlice";
import userCreationReducer from "./auth/userCreation";
import UserLoginReducer from "./auth/login";
import CartReducer from "./cart/cart";
import checkOutReducer from "./cart/checkout";
import ProductCreatedReducer from "./products/productsSlice";
import EditProductReducer from "./products/editProductSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    userCreation: userCreationReducer,
    userLogin: UserLoginReducer,
    cart: CartReducer,
    checkout: checkOutReducer,
    product: ProductCreatedReducer,
    editProduct: EditProductReducer,
  },
});
// store.subscribe(() => {
//   console.log(store.getState().user.userData);
// });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
