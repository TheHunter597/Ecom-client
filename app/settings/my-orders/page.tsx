import { fetchServer } from "@/utils/functions/fetchServer";
import MyOrdersMainContent from "./components/myOrdersMainContent";
import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import EmptyPage from "../components/EmptyPage";
export const metadata = {
  title: "My Orders",
};
export default async function MyOrders() {
  const orders = await fetchServer({
    urlInfo: {
      url: "api/v1/orders/",
      port: process.env.ORDERS_PORT as string,
      service: process.env.ORDERS_URL as string,
    },
    method: "GET",
    withToken: true,
    withCredentials: true,
    cache: "no-store",
  });

  return (
    <ProtectedRouteUserAuth>
      <div className="w-full bg-gray-100 h-screen ">
        <div className={`flex flex-col gap-4 mx-auto pt-8 `}>
          <div className="flex flex-col gap-1 w-10/12 mx-auto border-gray-500 pb-2">
            <h3 className="font-bold primary-color header-5sb first-letter:uppercase">
              Your Orders
            </h3>
          </div>
          {orders.orders.length > 0 ? (
            <MyOrdersMainContent orders={orders.orders} />
          ) : (
            <EmptyPage text={"You have not created any orders to display"} />
          )}
        </div>
      </div>
    </ProtectedRouteUserAuth>
  );
}
