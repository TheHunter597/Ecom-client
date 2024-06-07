import { useAppSelector } from "@/redux/reduxHooks";
import ProductsSection from "./thirdStep/productsSection";
import InfoSection from "./thirdStep/infoSection";
import { useState } from "react";
import ReactLoading from "react-loading";
import handleOrder from "./utils/handleOrder";
import { useFetch } from "@/utils/hooks/useFetch";
export default function ThirdStep({
  setcurrentStep,
}: {
  setcurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  let totalPrice = useAppSelector((state) => state.cart.totalPrice);
  let orderedProducts = useAppSelector((state) => state.cart.products);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<any>();
  const { fetchData: fetchDeleteCart, data } = useFetch({
    url: "/api/v1/cart/",
    method: "delete",
    withCredentials: true,
    withToken: true,
  });
  async function createOrders() {
    let orders = [];
    setLoading(true);
    for (let product of orderedProducts) {
      orders.push(
        handleOrder({
          product: product.productId,
          quantity: product.quantity,
          color: product.color.name,
          size: product.size ? product.size.name : undefined,
        })
      );
    }
    await Promise.all(orders);
    setLoading(false);
  }
  let errResult;
  if (error) {
    errResult = Object.keys(error?.errors).map((key) => error?.errors[key]);
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createOrders();
          await fetchDeleteCart();
          setcurrentStep(3);
        } catch (e: any) {
          console.log({ e });
        }
        setLoading(false);
      }}
      className="shadow-xl border border-gray-100
        rounded-xl w-full sm:w-7/12 px-4 sm:px-10 py-10
        flex flex-col items-center gap-10 bg-white"
    >
      <ProductsSection />
      <InfoSection />
      <div className="flex flex-row w-full justify-center pb-8 border-gray-700 border-b-2">
        <input
          placeholder="Coupon code"
          className="border-2 border-gray-800 rounded-l-md px-4 py-3 w-6/12 text-3sb"
        />
        <button className="primary-background-color px-6 py-3 rounded-r-md text-white">
          Apply
        </button>
      </div>
      {error && (
        <div className="flex flex-col gap-4">
          <small className="primary-color text-center text-3sb">
            {error.message}
          </small>

          <ul className="flex flex-col gap-2 text-red-700">
            {errResult?.map((error: any) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-row justify-center gap-6 w-full">
        <h6 className="flex flex-col gap-1">
          <span className="text-3sb primary-color">Total price</span>
          <span className="text-2sb secondary-color text-center">
            ${totalPrice.toFixed(2)}
          </span>
        </h6>
        {loading ? (
          <div className="flex flex-row justify-center">
            <ReactLoading
              type="bubbles"
              width={50}
              height={40}
              color="#101B42"
            />
          </div>
        ) : (
          <>
            <button
              className="main-yellow-background-color px-8 py-3 rounded-md self-center text-2sb
        primary-color w-fit sm:w-1/4 hover:opacity-80 duration-200"
            >
              Pay now
            </button>
          </>
        )}
      </div>
    </form>
  );
}
