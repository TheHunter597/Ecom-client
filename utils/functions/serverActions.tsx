"use server";

import { fetchServer } from "@/utils/functions/fetchServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deactivateUser() {
  try {
    await fetchServer({
      urlInfo: {
        url: "api/v1/auth/deactivate/",
        service: process.env.AUTH_URL as string,
        port: process.env.AUTH_PORT as string,
      },
      method: "POST",
      withCredentials: true,
      withToken: true,
    });
    const cookiesStore = cookies();
    cookiesStore.delete("access");
    cookiesStore.delete("refresh");
  } catch (e) {
    console.log(e);
  }
}

export async function signOut() {
  const cookiesStore = cookies();
  cookiesStore.delete("access");
  cookiesStore.delete("refresh");

  redirect("/");
}

export async function revalidateProductPage(productId: string | undefined) {
  revalidatePath("/");
  revalidatePath("/products/product/" + productId);
}
