import { cookies } from "next/headers";
export default async function checkUserAuthenticated() {
  const cookieStore = cookies();
  const access = cookieStore.get("access");
  let response = await fetch(
    "http://auth:8000/api/v1/auth/checkuserauthenticated/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access?.value}`,
      },
    }
  );
  if (response.status === 200) {
    let data = await response.json();
    console.log({ data });

    return {
      isAuthenticated: true,
      userData: data.user,
    };
  } else {
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
}
