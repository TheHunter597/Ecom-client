import { IFetchedUserData } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PhoneNavContent from "../PhoneNavContent";
import { useRouter } from "next/navigation";
import SearchElement from "../DesktopNavbarComponents/SearchElement/SearchElement";
import HamburgerMenu from "../components/HamburgerMenu";
export default function PhoneNavbar({
  result,
}: {
  result: {
    isAuthenticated: boolean;
    userData: IFetchedUserData | null;
  };
}) {
  const [sideNavActive, setSideNavActive] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between items-center px-3 py-3 shadow-md w-full sticky top-0 z-50 bg-white">
      <motion.div
        className="cursor-pointer"
        onClick={() => setSideNavActive((prev) => !prev)}
      >
        <HamburgerMenu />
      </motion.div>
      <h1
        className="header-5sb cursor-pointer select-none"
        onClick={() => {
          router.push("/");
        }}
        style={{
          background: " linear-gradient(to right, #ff7e5f, #feb47b)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        EcoMart
      </h1>
      <SearchElement />
      <AnimatePresence>
        <motion.div
          className="absolute w-8/12 z-20 overflow-auto h-screen top-0 left-0"
          initial={{ top: "100%", width: "0%" }}
          animate={
            sideNavActive
              ? { top: "0", width: "60%" }
              : { top: "100%", width: "0%" }
          }
          key={"navbar side content"}
        >
          <PhoneNavContent result={result} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
