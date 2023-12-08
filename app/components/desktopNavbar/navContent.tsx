"use client";
import Image from "next/image";
import Link from "next/link";
import downArrow from "../../../public/assets/arrows/downArrow.svg";
import navSearch from "../../../public/assets/nav/navSearch.svg";
import navCart from "../../../public/assets/nav/navCart.svg";
import hambuger from "../../../public/images/navBurger.png";
import { useState } from "react";
import SideNav from "./components/sideNav";
import { AnimatePresence } from "framer-motion";
export default function NavContent({
  result: { userData, isAuthenticated },
}: {
  result: { userData: any; isAuthenticated: boolean };
}) {
  let [sideNavActive, setSideNavActive] = useState(false);
  return (
    <header className="w-full py-4 shadow-md relative">
      <nav className="m-auto w-10/12 flex flex-row justify-between">
        <ul className="flex flex-row gap-6 items-center primary-color">
          <Link href="/">
            <li className="text-4xl Roboto font-bold">Logo</li>
          </Link>
          <li className="text-4r text-center">Shop now</li>
          <li className="text-4r">Deals</li>
          <li className="text-4r flex flex-row gap-1 items-center">
            More{" "}
            <Image src={downArrow} height={20} width={20} alt="down-arrow" />
          </li>
        </ul>
        <ul className="flex flex-row gap-3 items-center">
          <li className="cursor-pointer">
            <Image
              src={navSearch}
              width={50}
              height={50}
              alt="Search element"
            />
          </li>
          <li className="cursor-pointer">
            <Image src={navCart} width={40} height={40} alt="cart element" />
          </li>
          {isAuthenticated ? (
            <div className="relative">
              <Image
                src={hambuger}
                width={40}
                height={40}
                alt="hambuger element"
                className="cursor-pointer"
                onClick={() => {
                  setSideNavActive(true);
                }}
              />
              <AnimatePresence>
                {sideNavActive && (
                  <SideNav
                    userData={userData}
                    setSideNavActive={setSideNavActive}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => {
                  console.log("mangohsdf");
                }}
              >
                <li className="text-3sb font-bold border-2 py-2 px-5 primary-border-color rounded-md">
                  Login
                </li>
              </Link>
              <li
                className="text-3sb font-bold border-2 py-2 px-5 primary-border-color rounded-md 
                        primary-background-color text-white cursor-pointer  "
                onClick={() => {
                  window.location.href = "/auth/signup";
                }}
              >
                Sign up
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
