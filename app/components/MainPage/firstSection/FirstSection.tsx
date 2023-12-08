import FashionImage from "@/public/images/categories/Fashion.png";
import HomeImage from "@/public/images/categories/Home.png";
import GamingImage from "@/public/images/categories/Gaming.png";
import ReadingImage from "@/public/images/categories/Reading.png";
import CategoryElement from "./categoryElement";
import Link from "next/link";

export default function FirstSection() {
  let categories = [
    {
      name: "Fashion & makeup",
      link: "fashion&makeup",
      image: FashionImage,
    },
    {
      name: "Home & furniture",
      link: "home&furniture",
      image: HomeImage,
    },
    {
      name: "Gaming & consoles",
      link: "gaming&consoles",
      image: GamingImage,
    },
    {
      name: "Reading & learning",
      link: "reading&learning",
      image: ReadingImage,
    },
  ];
  let categoriesResult = categories.map((category) => {
    return <CategoryElement {...category} />;
  });
  return (
    <div className="w-10/12 m-auto mt-16 flex flex-col gap-4">
      <div className="flex flex-col gap-4 secondary-color">
        <div className="flex flex-row justify-between">
          <h2 className="header-5sb">Most popular categories</h2>
          <div className="flex flex-col items-baseline justify-end">
            {/* Your other content */}
            <Link href="/categories" className=" text-3sb">
              View all categories
            </Link>
          </div>
        </div>
        <div className="pt-1 bg-gray-700"></div>
      </div>
      <div className="text-2xl text-black grid grid-cols-4">
        {categoriesResult}
      </div>
    </div>
  );
}
