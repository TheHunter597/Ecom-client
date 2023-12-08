import checkUserAuthenticated from "@/utils/functions/checkUserAuthenticated";
import NavContent from "./navContent";
export default async function Navbar() {
  let result: { isAuthenticated: boolean; userData: any } =
    await checkUserAuthenticated();

  return <NavContent result={result} />;
}
