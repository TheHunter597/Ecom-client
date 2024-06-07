"use client";

import { ICategory } from "@/utils/types";
import CategoryElement from "./categoryElement";
import { useMemo, useState } from "react";
import MakeSlider from "../../others/MakeSlider";
import SlideableElement from "../../others/SlideableElement";
import { useRouter } from "next/navigation";

export default function CategoriesResult({
  categories,
}: {
  categories: ICategory[];
}) {
  const [currentActive, setCurrentActive] = useState(-1);
  let res: {
    name: string;
    link: string;
    image: any;
  }[] = categories.map((category: ICategory) => {
    return {
      name: category.name,
      link: category.name.toLowerCase(),
      image: category.image,
    };
  });
  const router = useRouter();
  let categoriesResult = useMemo(() => {
    return res.map((category, index) => {
      return (
        <SlideableElement
          key={"CategoryResultNumber" + index}
          functionToRun={() => {
            if (category.link.includes("&")) {
              category.link = category.link.replace("&", "%26");
            }

            router.push(`/products?category=${category.link}`);
          }}
        >
          <CategoryElement
            {...category}
            index={index}
            currentActive={currentActive}
            setCurrentActive={setCurrentActive}
          />
        </SlideableElement>
      );
    });
  }, [categories, currentActive]);
  return <MakeSlider>{categoriesResult}</MakeSlider>;
}
