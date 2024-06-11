import React from "react";
import checkUserAuthenticated from "../functions/checkUserAuthenticated";
import UserAuthenticatedWrapper from "./UserAuthenticatedWrapper";
export default async function ProtectedRouteUserAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  let userAuthenticated = await checkUserAuthenticated();
  if (!userAuthenticated.isAuthenticated) {
    return (
      <UserAuthenticatedWrapper
        throwError={true}
        type="login"
        error={"You are not authenticated Please login to access this route"}
      >
        {children}
      </UserAuthenticatedWrapper>
    );
  }
  return <>{children}</>;
}
