import checkUserAuthenticated from "@/utils/functions/checkUserAuthenticated";
import NavbarReduxProvider from "./NavbarReduxProvider";
import { IFetchedUserData } from "@/utils/types";
export default async function Navbar() {
  let result: { isAuthenticated: boolean; userData: IFetchedUserData | null } =
    await checkUserAuthenticated();

  return <NavbarReduxProvider result={result} />;
}
