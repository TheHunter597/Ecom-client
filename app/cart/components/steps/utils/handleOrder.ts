import axios from "axios";
export default async function handleOrder({
  product,
  quantity,
  color,
  size,
}: {
  product: string;
  quantity: number;
  color: string;
  size?: string;
}) {
  let token: any;
  if (typeof window !== "undefined") {
    token = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.includes("access"))
      ?.split("=")[1];
  }
  await axios.post(
    "/api/v1/orders/",
    {
      product: product,
      quantity,
      color,
      size,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
