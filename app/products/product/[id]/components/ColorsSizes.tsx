"use client";

import ColorsSection from "./ColorsSections";
import SizesSection from "./SizesSection";
export default function ColorsSizes({
  sizes,
  colors,
  chosenColor,
  setChosenColor,
  chosenSize,
  setChosenSize,
  productId,
}: {
  colors: Array<{
    name: string;
    hex: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
  }> | null;
  chosenColor: {
    name: string;
    hex: string;
  };
  setChosenColor: Function;
  chosenSize: {
    name: string;
    abbreviation: string;
  };
  setChosenSize: Function;
  productId: string;
}) {
  return (
    <div className="flex flex-col gap-3 text-2sb  primary-border-color ">
      <ColorsSection
        colors={colors}
        setChosenColor={setChosenColor}
        chosenColor={chosenColor}
      />
      {sizes && sizes.length > 0 && (
        <SizesSection
          sizes={sizes}
          setChosenSize={setChosenSize}
          chosenSize={chosenSize}
          productId={productId}
        />
      )}
    </div>
  );
}
