"use client";
import store from "@/redux";
import { Provider } from "react-redux";
import IsAuthenticatedProvider from "./isAuthenticatedProvider";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <IsAuthenticatedProvider>{children}</IsAuthenticatedProvider>
    </Provider>
  );
}
