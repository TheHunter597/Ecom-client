import DesktopNavContent from "./DesktopNavbarComponents/DesktopNavContent";
import { IFetchedUserData } from "@/utils/types";
import PhoneNavbar from "./PhoneNavbarComponents/PhoneNavbar";
export default function DesktopPhoneNavbar({
  result,
}: {
  result: { isAuthenticated: boolean; userData: IFetchedUserData | null };
}) {
  return (
    <>
      <div className="hidden sm:sticky sm:block top-0 z-50">
        <DesktopNavContent result={result} />
      </div>

      <div className="sticky top-0 sm:hidden z-50">
        <PhoneNavbar result={result} />
      </div>
    </>
  );
}
