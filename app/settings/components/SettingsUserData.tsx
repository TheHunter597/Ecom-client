"use client";

import { useAppSelector } from "@/redux/reduxHooks";
import Image from "next/image";

export default function SettingsUserData() {
  const { avatar, firstName, lastName, dateJoined } = useAppSelector(
    (state) => state.user.userData
  );
  const dateFormatted = new Date(dateJoined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="flex flex-col gap-2 pl-10">
      <div className="flex flex-row gap-3 justify-start items-center">
        <Image
          src={avatar}
          width={80}
          height={80}
          alt="avatar"
          className="rounded-3xl"
          sizes="80px"
          style={{ height: "80px", width: "80px" }}
        />
        <h5 className="text-2sb font-bold primary-color text-3sb ">
          {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
          {lastName.charAt(0).toUpperCase() + lastName.slice(1)}{" "}
        </h5>
      </div>
      <h6 className="flex flex-col gap-2 text-left text-3sb text-gray-700">
        <span>Joined on</span>
        <span>{dateFormatted}</span>
      </h6>
    </div>
  );
}
