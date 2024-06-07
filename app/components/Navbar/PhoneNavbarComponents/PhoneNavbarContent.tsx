import UserNotAuthenticatedPlaceHolder from "@/public/assets/nav/UserNotAuthenticatedPlaceHolder.svg";
import { IFetchedUserData } from "@/utils/types";

import Image from "next/image";
import PhoneNavbarLinks from "./PhoneNavbarLinks";

export default function PhoneNavbarContent({
  isAuthenticated,
  userData,
  phoneView,
}: {
  isAuthenticated: boolean;
  userData: IFetchedUserData | null;
  phoneView: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 items-center align-middle">
        <Image
          height={0}
          width={0}
          sizes="80px"
          style={{ height: "4rem", width: "4rem" }}
          alt="avatar"
          className="rounded-full "
          src={
            isAuthenticated ? userData?.avatar : UserNotAuthenticatedPlaceHolder
          }
        />
        <h4 className="text-3sb text-white text-center">
          {isAuthenticated
            ? `${userData?.first_name} ${userData?.last_name}`
            : "Guest User"}
        </h4>
      </div>
      <PhoneNavbarLinks
        phoneView={phoneView}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}
