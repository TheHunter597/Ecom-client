import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SettingsAccountElement({
  index,
  element,
}: {
  index: number;
  element: {
    icon: any;
    text: string;
    link?: string;
    action?: () => Promise<void>;
  };
}) {
  const router = useRouter();

  return (
    <motion.div
      key={index}
      onClick={() => {
        router.push(element.link != undefined ? element.link : "");
      }}
      className={`flex flex-row gap-1 items-center py-3 
        hover:bg-white duration-200
      justify-center cursor-pointer primary-color -z-10 InvertHoverButton`}
    >
      <div style={{ filter: "invert(100%)" }}>
        <Image src={element.icon} width={30} height={30} alt="settings icon" />
      </div>
      <h5 className="text-3sb font-bold">{element.text}</h5>
    </motion.div>
  );
}
