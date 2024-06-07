"use client";

import NotAuthenticatedError from "./exceptions/NotAuthenticatedError";

export default function UserAuthenticatedWrapper({
  throwError,
  error,
  children,
  type,
}: {
  throwError: boolean;
  error: string;
  children: React.ReactNode;
  type: "login" | "unauthorized" | "other";
}) {
  if (throwError) {
    if (type === "login") {
      throw new NotAuthenticatedError(error);
    }
  }
  return <>{children}</>;
}
