import { Metadata } from "next";
import LoginMainContent from "./LoginMainContent";
export const metadata: Metadata = {
  title: "Login",
};
export default function Login() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div className="w-11/12 sm:w-5/12 md:4/12 flex flex-row items-center justify-center">
        <LoginMainContent />;
      </div>
    </div>
  );
}
