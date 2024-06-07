"use client";
import Image from "next/image";
import AccountIcon from "@/public/assets/settings/Account.svg";
import LeftArrowIcon from "@/public/assets/arrows/whiteLeftArrow.png";
import { useState } from "react";

import ChangeProfileDataIcon from "@/public/assets/others/NoAvatar.svg";
import ChangePasswordIcon from "@/public/assets/settings/changePassword.svg";
import { motion } from "framer-motion";
import SettingsAccountElement from "./SettingsAccountElement";
import Deactivate from "./Deactivate/Deactivate";

export default function AccountSettingsElement() {
  const [active, setActive] = useState(false);
  const AccountElements = [
    {
      icon: ChangeProfileDataIcon,
      text: "Change Profile Data",
      link: "settings/profile-edit",
    },
    {
      icon: ChangePasswordIcon,
      text: "Change Password",
      link: "settings/change-password",
    },
  ];
  const elementsVariants = {
    active: {
      height: "100%",
      transition: {
        duration: 0.4,
      },
      opacity: 1,
      zIndex: 1,
    },
    inactive: {
      height: "0",
      opacity: 0,
      zIndex: -100,
    },
  };
  const elementsResult = AccountElements.map((element, index) => {
    return (
      <SettingsAccountElement
        key={`AccountSettingElement-${index}`}
        element={element}
        index={index}
      />
    );
  });

  return (
    <motion.div className="flex flex-col">
      <div
        onClick={() => {
          setActive(!active);
        }}
        className="flex flex-row gap-2 justify-center px-8 py-5 bg-black InvertHoverButton
           text-white text-2sb cursor-pointer hover:bg-white hover:text-black duration-200 border border-black"
      >
        <div>
          <Image
            src={AccountIcon}
            width={30}
            height={30}
            alt="account   icon"
          />
        </div>
        <h6 className="text-2sb font-bold">Account</h6>
        <div
          style={{
            transform: `rotate(${active ? -90 : 90}deg)`,
            color: "green",
          }}
        >
          <div>
            <Image
              src={LeftArrowIcon}
              width={28}
              height={28}
              alt="left arrow icon"
            />
          </div>
        </div>
      </div>
      <motion.div
        key={"AccountSettingsElements"}
        variants={elementsVariants}
        animate={active ? "active" : "inactive"}
        initial="inactive"
        className={`flex flex-col  bg-red-300`}
      >
        {elementsResult}
        <Deactivate />
      </motion.div>
    </motion.div>
  );
}
