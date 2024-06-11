import YourProductsIcon from "@/public/assets/settings/YourProducts.svg";
import OrdersIcon from "@/public/assets/settings/Orders.svg";

import SettingsElement from "./components/SettingsElement";
import SettingsUserData from "./components/SettingsUserData";
import AccountSettingsElement from "./components/AccountSettingsElement";
import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import WishListIcon from "@/public/assets/products/wishlist.svg";

export const metadata = {
  title: "Settings",
};
export default function Settings() {
  const settingsElements = [
    {
      icon: OrdersIcon,
      text: "View your Orders",
      link: "/settings/my-orders",
    },
    {
      icon: YourProductsIcon,
      text: "View Your products",
      link: "/settings/my-products",
    },
    {
      icon: WishListIcon,
      text: "View Your Wishlist",
      link: "/settings/my-wishlist",
    },
  ];
  const settingsResult = settingsElements.map((element, index) => {
    return (
      <SettingsElement
        key={index}
        element={element}
        index={index}
        settingsElementsLength={settingsElements.length}
      />
    );
  });
  return (
    <ProtectedRouteUserAuth>
      <div
        className="flex flex-row items-center justify-center align-middle text-center py-6
      min-h-screen  bg-gray-300"
      >
        <div className="flex flex-col gap-4 w-11/12 mx-auto sm:w-5/12 bg-white shadow-xl pt-4 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center pb-8">
            <h5 className="header-5sb primary-color">Settings</h5>
          </div>
          <SettingsUserData />
          <div className="flex flex-col">
            <AccountSettingsElement />

            {settingsResult}
          </div>
        </div>
      </div>
    </ProtectedRouteUserAuth>
  );
}
