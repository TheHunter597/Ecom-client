"use client";
import ReduxProvider from "@/app/reduxProvider";
import DesktopPhoneNavbar from "./DesktopPhoneNavbar";
import { IFetchedUserData } from "@/utils/types";

export default function NavbarReduxProvider({
  result,
}: {
  result: { isAuthenticated: boolean; userData: IFetchedUserData | null };
}) {
  return (
    <ReduxProvider>
      <DesktopPhoneNavbar result={result} />
    </ReduxProvider>
  );
}
