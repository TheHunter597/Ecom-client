"use client";
import ErrorImage from "@/public/assets/others/Error.svg";
import HomeButton from "@/utils/Errors/exceptions/buttons/Home";
import LoginHome from "@/utils/Errors/exceptions/buttons/LoginHome";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; type: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-gray-100">
      <h1 className="header-6sb primary-color">Oops Error just happened</h1>
      <div className=" text-center flex flex-col gap-2">
        <p className="header-4sb text-red-400">{error.message}</p>
      </div>
      <Image src={ErrorImage} alt="Error" height={520} width={520} />
      <div className="flex flex-col gap-10 items-center min-w-fit">
        {error.type == "login" ? <LoginHome /> : <HomeButton />}
      </div>
    </div>
  );
}
