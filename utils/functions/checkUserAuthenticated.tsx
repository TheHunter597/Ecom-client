import { cookies } from "next/headers";
export default async function checkUserAuthenticated() {
  const cookieStore = cookies();
  const access = cookieStore.get("access");
  const authServer = process.env.AUTH_URL;
  const authPort = process.env.AUTH_PORT;
  try {
    let response = await fetch(
      `http://${authServer}:${authPort}/api/v1/auth/checkuserauthenticated/`,
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
  } catch (e) {
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
}
