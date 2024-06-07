import HomeIcon from "@/public/assets/nav/Home.svg";
import CartIcon from "@/public/assets/nav/WhiteCart.svg";
import WishlistIcon from "@/public/assets/products/wishlist.svg";
import AddProductIcon from "@/public/assets/nav/WhiteAddProduct.svg";

import SettingsIcon from "@/public/assets/nav/WhiteSettings.svg";

import ContactMeIcon from "@/public/assets/nav/Contact.svg";
import SideNavElement from "../components/sideNavElement";
import PhoneNavbarSignLogButtons from "./PhoneNavbarSignLogButtons";
import Logout from "./Logout";
import { useMemo } from "react";

export default function PhoneNavbarLinks({
  isAuthenticated,
  phoneView,
}: {
  isAuthenticated: boolean;
  phoneView: boolean;
}) {
  const firstSectionElements = [
    {
      icon: HomeIcon,
      text: "Home",
      alt: "home icon",
      link: "/",
    },
    {
      icon: CartIcon,
      text: "Cart",
      alt: "cart icon",
      link: "/cart",
    },
    isAuthenticated && {
      icon: WishlistIcon,
      text: "Wishlist",
      alt: "wishlist icon",
      link: "/settings/my-wishlist",
    },
    isAuthenticated && {
      icon: AddProductIcon,
      text: "Add Product",
      alt: "add product icon",
      link: "/products/create",
    },
  ];
  const firstSectionResult = firstSectionElements.map((element, index) => {
    if (element != false) {
      return (
        <SideNavElement
          key={`SideNavElement ${index}`}
          icon={element.icon}
          text={element.text}
          alt={element.alt}
          link={element.link}
          phoneView={phoneView}
        />
      );
    }
    return null;
  });
  const secondSectionElements = [
    isAuthenticated && {
      icon: SettingsIcon,
      text: "Settings",
      alt: "settings icon",
      link: "/settings",
    },
  ];

  const secondSectionResult = secondSectionElements.map((element, index) => {
    if (element != false) {
      return (
        <SideNavElement
          key={`SideNavElement ${index}`}
          icon={element.icon}
          text={element.text}
          alt={element.alt}
          link={element.link}
          phoneView={phoneView}
        />
      );
    }
    return null;
  });

  const thirdSectionElements = [
    {
      icon: ContactMeIcon,
      text: "Contact Me",
      alt: "contact Me icon",
      link: (process.env.NEXT_PUBLIC_PORTFOLIO_URL as string) || "",
    },
  ];

  const thirdSectionResult = thirdSectionElements.map((element, index) => {
    return (
      <SideNavElement
        key={`SideNavElement ${index}`}
        icon={element.icon}
        text={element.text}
        alt={element.alt}
        link={element.link}
        phoneView={phoneView}
      />
    );
  });
  const LogOutElement = useMemo(() => {
    return <Logout />;
  }, []);
  return (
    <>
      <div className="h-1 bg-gray-400 rounded-lg"></div>
      <div className="flex flex-col gap-1">{firstSectionResult}</div>
      {isAuthenticated && (
        <>
          <div className="h-1 bg-gray-400 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            {secondSectionResult}
            {LogOutElement}
          </div>
        </>
      )}
      {!isAuthenticated && <PhoneNavbarSignLogButtons />}
      <div className="h-1 bg-gray-400 rounded-lg"></div>
      <div className="flex flex-col gap-1">{thirdSectionResult}</div>
    </>
  );
}
