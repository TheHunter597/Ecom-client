"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import LogOutIcon from "@/public/assets/nav/Logout.svg";
import SettingsIcon from "@/public/assets/nav/settings.svg";
import CreateProductIcon from "@/public/assets/products/createProduct.svg";
import { useFetch } from "@/utils/hooks/useFetch";
import { useRouter } from "next/navigation";
import SideNavElement from "../components/sideNavElement";
import { IFetchedUserData } from "@/utils/types";
import ContactMeIcon from "@/public/assets/nav/Contact.svg";
import { signOut } from "@/utils/functions/serverActions";

export default function SideNav({
  userData: {
    first_name,
    last_name,

    avatar,
  },
  setSideNavActive,
}: {
  userData: IFetchedUserData;
  setSideNavActive: Function;
}) {
  let variants = {
    initial: {
      opacity: 1,
      y: -30,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -80,
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
  const elements = [
    {
      icon: SettingsIcon,
      text: "Settings",
      alt: "settings icon",
      link: "/settings",
    },
    {
      icon: CreateProductIcon,
      text: "Create Product",
      alt: "create product icon",
      link: "/products/create",
    },
    {
      icon: ContactMeIcon,
      text: "Contact Me",
      alt: "contact Me icon",
      link: (process.env.NEXT_PUBLIC_PORTFOLIO_URL as string) || "",
    },
  ];
  const sideNavResult = elements.map((element, index) => {
    return (
      <SideNavElement
        key={`SideNavElement ${index}`}
        icon={element.icon}
        text={element.text}
        alt={element.alt}
        link={element.link}
        phoneView={false}
      />
    );
  });
  return (
    <motion.div
      className="absolute pt-6 primary-color shadow-lg border
       border-gray-50 top-14 -right-1/2 rounded-lg bg-white
       flex flex-col gap-4 items-center w-48 z-50"
      variants={variants}
      initial="initial"
      animate="animate"
      ref={sideNavRef}
      exit="exit"
    >
      <Image
        src={avatar || "assets/nav/UserNotAuthenticatedPlaceHolder.svg"}
        alt="profile picture"
        width={50}
        height={30}
      />
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center px-4">
          <h5 className="text-3sb flex flex-row gap-1">
            <span>{first_name}</span>
            <span>{last_name}</span>
          </h5>
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="bg-gray-500 w-full border-t-2 border-gray-300"></div>
          {sideNavResult}

          <form
            className="w-full "
            onSubmit={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <button
              className="text-white flex flex-row gap-1 font-bold items-center 
          justify-center cursor-pointer bg-red-400 py-3 rounded-b-lg w-full"
            >
              <Image src={LogOutIcon} alt="settings icon" />
              Logout
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
