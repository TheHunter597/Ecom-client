"use client";
import Image from "next/image";
import Link from "next/link";
import navCart from "../../../../public/assets/nav/navCart.svg";
import { useEffect, useState } from "react";
import SideNav from "./sideNav";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/reduxHooks";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "@/redux/cart/cart";
import SearchElement from "./SearchElement/SearchElement";
import { IFetchedUserData } from "@/utils/types";
import Hamburger from "../components/HamburgerMenu";
import { motion } from "framer-motion";
export default function NavContent({
  result: { userData, isAuthenticated },
}: {
  result: { userData: IFetchedUserData | null; isAuthenticated: boolean };
}) {
  let [sideNavActive, setSideNavActive] = useState(false);
  const products = useAppSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    if (isAuthenticated) dispatch(fetchCartItems());
  }, [dispatch, isAuthenticated]);

  return (
    <header className="w-full h-16 shadow-md sticky top-0 bg-white z-40 flex flex-col items-center ">
      <nav className="m-auto w-10/12 flex flex-row justify-between">
        <ul className="flex flex-row gap-6 items-center primary-color">
          <Link href="/">
            <li
              className="header-5sb Roboto font-bold"
              style={{
                background: " linear-gradient(to right, #000428, #004e92)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              EcoMart
            </li>
          </Link>
        </ul>
        <ul className="flex flex-row gap-3 items-center w-fit">
          <SearchElement />
          <Link className="cursor-pointer relative" href="/cart">
            <span className=" text-center text-4sb absolute top-0 right-0 rounded-2xl h-5 w-5 bg-gray-400 z-10">
              {products.length}
            </span>
            <Image src={navCart} width={40} height={40} alt="cart element" />
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <motion.div
                initial={{ rotate: 180 }}
                onClick={() => {
                  setSideNavActive(true);
                }}
              >
                <Hamburger />
              </motion.div>

              <AnimatePresence>
                {sideNavActive && userData && (
                  <SideNav
                    userData={userData}
                    setSideNavActive={setSideNavActive}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <li className="text-3sb font-bold border-2 py-2 px-5 primary-border-color rounded-sm">
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
