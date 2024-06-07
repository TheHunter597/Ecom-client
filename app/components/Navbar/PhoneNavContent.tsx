import PhoneNavbarContent from "./PhoneNavbarComponents/PhoneNavbarContent";
import { IFetchedUserData } from "@/utils/types";

export default function PhoneNavContent({
  result: { userData, isAuthenticated },
}: {
  result: { isAuthenticated: boolean; userData: IFetchedUserData | null };
}) {
  return (
    <div className="px-4 py-10 primary-background-color h-full">
      <PhoneNavbarContent
        userData={userData}
        isAuthenticated={isAuthenticated}
        phoneView={true}
      />
    </div>
  );
}
