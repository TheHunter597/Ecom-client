import Image from "next/image";
import ExitIcon from "@/public/assets/others/exit.svg";
import { createPortal } from "react-dom";

export default function CompleteInfoOverlay({
  missingData,
  setOpenOverlay,
  type,
}: {
  missingData: string[];
  setOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  type: "info" | "empty";
}) {
  let missingDataMessage = missingData.join(", ");
  return createPortal(
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400 bg-opacity-50 z-50">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2
       -translate-y-1/2 bg-white rounded-lg p-12 md:w-4/12 sm:8-12 w-10/12"
      >
        <div
          className="absolute cursor-pointer top-4 right-5"
          onClick={() => {
            setOpenOverlay(false);
          }}
        >
          <Image src={ExitIcon} alt="exit" width={24} height={24} />
        </div>
        {type == "info" ? (
          <>
            <div className="text-1sb text-gray-700 mb-4 text-center">
              Please complete your profile info to continue
            </div>
            <div className="text-2sb text-gray-700 text-center flex flex-col gap-1">
              <span className="secondary-color">You are missing </span>
              <span className="tertiary-color">{missingDataMessage}</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-1sb text-gray-700 mb-4 text-center">
              There is not products in your cart yet
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
