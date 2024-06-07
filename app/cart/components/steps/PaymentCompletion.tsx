import { useRouter } from "next/navigation";
import doneAnimation from "@/public/assets/cart/Animation - 1700274046832.gif";
import Image from "next/image";
export default function PaymentCompletion() {
  let router = useRouter();
  return (
    <div
      className="sm:w-7/12 mx-auto bg-white shadow-xl border-2
     border-gray-100 rounded-lg py-6 px-6
     flex flex-col items-center justify-center
     "
    >
      <Image
        src={doneAnimation}
        height={250}
        width={250}
        alt="finished animations"
      />
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="header-5sb primary-color">Congratulations </h3>
          <p className="text-2sb text-gray w-8/12 text-center">
            Your transaction has been processed successfully
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-3sb text-gray
        border-2 border-gray-800 rounded-lg py-2 w-8/12 md:w-6/12 
        hover:text-white hover:bg-gray-800 hover:border-gray-800 duration-300
        "
        >
          Continue to website
        </button>
      </div>
    </div>
  );
}
