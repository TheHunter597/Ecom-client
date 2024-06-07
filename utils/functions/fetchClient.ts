import axios from "axios";
interface props {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
  withCredentials?: boolean;
  withToken?: boolean;
}

export default async function fetchClient({
  method,
  url,
  body,
  withCredentials,
  withToken,
}: props) {
  let token: any;
  if (typeof window !== "undefined") {
    token = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.includes("access"))
      ?.split("=")[1];
  }
  try {
    let res;
    if (method === "get" || method === "delete") {
      res = await axios[method](url, {
        withCredentials: withCredentials ? true : false,
        headers: {
          Authorization: withToken ? `Bearer ${token}` : null,
        },
      });
    } else {
      res = await axios[method](url, body, {
        withCredentials: withCredentials ? true : false,
        headers: {
          Authorization: withToken ? `Bearer ${token}` : null,
        },
      });
    }
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
