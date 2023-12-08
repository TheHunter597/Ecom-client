"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import LogOutIcon from "@/public/assets/nav/logout.svg";
import SettingsIcon from "@/public/assets/nav/settings.svg";
import Link from "next/link";
import { useFetch } from "@/utils/hooks/useFetch";
import { useRouter } from "next/navigation";
export default function SideNav({
  userData: {
    first_name,
    last_name,
    email,
    username,
    phone_number,
    address,
    city,
    state,
    country,
    zip_code,
    profile_picture,
    avatar,
  },
  setSideNavActive,
}: {
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    profile_picture: string;
    avatar: string;
  };
  setSideNavActive: Function;
}) {
  let variants = {
    initial: {
      opacity: 1,
      y: -50,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -150,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const sideNavRef = useRef<HTMLDivElement>(null);
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/logout/",
    method: "get",
    withCredentials: true,
    withToken: true,
  });
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setSideNavActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  let router = useRouter();
  return (
    <motion.div
      className="absolute pt-6 primary-color shadow-lg border
       border-gray-50 top-14 -right-1/2 rounded-lg bg-white
       flex flex-col gap-4 items-center w-48"
      variants={variants}
      initial="initial"
      animate="animate"
      ref={sideNavRef}
      exit="exit"
    >
      <Image src={avatar} alt="profile picture" width={50} height={30} />
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center px-4">
          <h5 className="text-3sb flex flex-row gap-1">
            <span>{first_name}</span>
            <span>{last_name}</span>
          </h5>
          <span className="text-4r text-blue-800">(Profile)</span>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-gray-500 w-full border-t-2 border-gray-300"></div>
          <Link
            href="/settings"
            className="primary-color flex flex-row gap-1 font-bold items-center justify-center cursor-pointer"
          >
            <Image src={SettingsIcon} alt="settings icon" />
            Settings
          </Link>
          <p
            className=" text-white flex flex-row gap-1 font-bold items-center 
          justify-center cursor-pointer bg-red-400 py-3 rounded-b-lg"
            onClick={async () => {
              await fetchData();
              router.refresh();
            }}
          >
            <Image src={LogOutIcon} alt="settings icon" />
            Logout
          </p>
        </div>
      </div>
    </motion.div>
  );
}
