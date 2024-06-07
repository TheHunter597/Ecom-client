import Hero from "../components/MainPage/Hero/Hero";
import FirstSection from "../components/MainPage/firstSection/FirstSection";
import ProductsSlide from "../components/MainPage/secondSection/ProductsSlide";
export const revalidate = true;
export default function Home() {
  return (
    <div>
      <Hero />
      <FirstSection />
      <div>
        <ProductsSlide
          limit={20}
          mainHeader="New products"
          bgColor="bg-pink-200"
        />
        <ProductsSlide
          limit={20}
          mainHeader="Discounted Items"
          bgColor="bg-blue-200"
          filterWith={{ discount: "gt,0" }}
        />
        <ProductsSlide
          limit={20}
          mainHeader="Men Fashion"
          bgColor="bg-yellow-200"
          filterWith={{ category: "men%26fashion" }}
        />
        <ProductsSlide
          limit={20}
          mainHeader="Electronics"
          bgColor="bg-green-200"
          filterWith={{ category: "electronics" }}
        />
        <ProductsSlide
          limit={20}
          mainHeader="Gaming"
          bgColor="bg-red-300"
          filterWith={{ category: "gaming" }}
        />

        <ProductsSlide
          limit={20}
          mainHeader="Movies"
          bgColor="bg-emerald-200"
          filterWith={{ category: "movies" }}
        />
      </div>
    </div>
  );
}
