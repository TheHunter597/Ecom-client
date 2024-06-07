"use client";
import rightIcon from "@/public/assets/products/RightIcon.svg";
import Image from "next/image";

export default function ColorElement({
  color,
  setChosenColor,
  chosenColor,
  elementSize: { type, rightIconSize } = {
    type: "medium",
    rightIconSize: 20,
  },
}: {
  color: { name: string; hex: string };
  setChosenColor?: Function;
  chosenColor?: { name: string; hex: string };
  elementSize?: {
    type: "small" | "medium" | "large";
    rightIconSize: number;
  };
}) {
  return (
    <span
      key={`${color.name}-${color.hex}`}
      className={`${
        type == "small" ? "h-6 w-6" : "h-9 w-9"
      } rounded-full flex flex-col items-center justify-center 
             cursor-pointer hover:scale-105 duration-150`}
      onClick={() => {
        if (setChosenColor) setChosenColor(color);
      }}
      style={{ backgroundColor: color.hex }}
    >
      {chosenColor?.name == color.name && (
        <Image
          src={rightIcon}
          alt="righ icon"
          width={rightIconSize}
          height={rightIconSize}
        />
      )}
    </span>
  );
}
