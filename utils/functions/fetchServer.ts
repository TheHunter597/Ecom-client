import { cookies } from "next/headers";

interface Props {
  urlInfo: {
    url: string;
    port: string;
    service: string;
  };
  method: "GET" | "POST" | "PUT" | "DELETE";
  cache?: "no-cache" | "reload" | "force-cache" | "only-if-cached";
  withToken?: boolean;
  withCredentials?: boolean;
  body?: any;
  revalidate?: number;
}

export async function fetchServer({
  urlInfo: { url, port, service },
  method,
  cache,
  withToken,
  withCredentials,
  body,
  revalidate = 120,
}: Props) {
  let token = cookies().get("access")?.value;
  let response = await fetch(`http://${service}:${port}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(withToken && { Authorization: `Bearer ${token}` }),
    },
    ...(withCredentials && { credentials: "include" }),
    cache,
    body: JSON.stringify(body),
    next: { revalidate: revalidate },
  });
  let data = await response.json();

  return data;
}
