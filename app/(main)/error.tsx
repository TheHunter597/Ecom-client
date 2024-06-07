"use client";
import ErrorImage from "@/public/assets/others/Error.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  let router = useRouter();
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <h1 className="header-5sb primary-color">Oops Error just happened</h1>
      <Image src={ErrorImage} alt="Error" height={450} width={450} />
      <div className="flex flex-col gap-10 items-center">
        <div className="w-10/12 text-center flex flex-col gap-2">
          <p className="text-2sb text-red-600">{error.message}</p>
        </div>
        <button
          className="bg-red-600 text-white text-2sb px-4 py-2 rounded-md"
          onClick={() => router.push("/auth/login")}
        >
          Go to Login page
        </button>
      </div>
    </div>
  );
}
