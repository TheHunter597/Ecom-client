"use client";
import TextLineSeperator from "@/app/components/others/TextLineSeperator";
import { useState } from "react";

export default function ColorsSizes({
  sizes,
  colors,
}: {
  colors: Array<{
    name: string;
    hex: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
  }>;
}) {
  let [chosenColor, setChosenColor] = useState(colors[0]);
  let [chosenSize, setChosenSize] = useState(sizes[0]);

  return (
    <div className="flex flex-col gap-3 text-2sb  primary-border-color ">
      <div className="flex flex-col gap-2">
        <TextLineSeperator text="Colors" />
        <div
          className="flex flex-col gap-4 
    text-2sb primary-border-color pl-4"
        >
          <div className="flex flex-row gap-1 items-center ">
            <span>Current chosen color: </span>
            <span
              className="flex flex-row gap-1 justify-center items-center "
              style={{ color: chosenColor.hex }}
            >
              {chosenColor.name[0].toUpperCase() + chosenColor.name.slice(1)}{" "}
              <span
                className="h-8 w-8 rounded-full flex flex-col items-center justify-center 
              border border-black"
              >
                <span
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: chosenColor.hex }}
                ></span>
              </span>
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <p>Available colors: </p>
            <div className="flex flex-row gap-2">
              {colors.map((color) => (
                <span
                  key={`${color.name}-${color.hex}`}
                  className="h-8 w-8 rounded-lg flex flex-col items-center justify-center 
              border border-black cursor-pointer hover:scale-105 duration-150"
                  onClick={() => setChosenColor(color)}
                >
                  <span
                    className="h-6 w-6 rounded-lg"
                    style={{ backgroundColor: color.hex }}
                  ></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <TextLineSeperator text="Sizes" />

        <div className="flex flex-col gap-2 pl-4 ">
          <div className="flex flex-row gap-1 items-center ">
            <span>Current chosen size: </span>
            <span className="flex flex-row gap-1 justify-center items-center primary-color ">
              {chosenSize.name[0].toUpperCase() + chosenSize.name.slice(1)} (
              {chosenSize.abbreviation})
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p>Available sizes: </p>
            <div className="flex flex-row gap-2">
              {sizes.map((size) => (
                <span
                  key={`${size.name}-${size.abbreviation}`}
                  className={`h-8 w-8 rounded-sm flex flex-col items-center justify-center 
              border border-black cursor-pointer p-5 hover:bg-gray-900 hover:text-white duration-150
              ${chosenSize.name == size.name && "bg-gray-900 text-white"}
              `}
                  onClick={() => setChosenSize(size)}
                >
                  <span className="text-2sb">{size.abbreviation}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
