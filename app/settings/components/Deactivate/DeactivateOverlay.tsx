import Image from "next/image";
import DeactivateAccountIcon from "@/public/assets/settings/DeActivate.svg";

export default function DeactivateOverlay({
  setOverlayActive,
  formRef,
}: {
  setOverlayActive: Function;
  formRef: any;
}) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-300 bg-opacity-20 flex flex-col items-center justify-center z-50">
      <div className="relative bg-white rounded-lg px-4 py-8 text-2sb flex flex-col gap-6 items-center justify-center w-fit">
        <div
          className="absolute top-2 right-2 font-bold text-1sb cursor-pointer"
          onClick={() => {
            setOverlayActive(false);
          }}
        >
          X
        </div>
        <p className="text-red-400">
          Are you sure you want to De-activate your account
        </p>
        <div
          className="w-full flex flex-row gap-1 items-center py-3 
        bg-red-500 duration-200 text-white
      justify-center cursor-pointer primary-color InvertHoverButton "
        >
          <button
            className={`flex flex-row gap-1 items-center justify-center`}
            type="submit"
            onClick={() => {
              formRef.current.submit();
            }}
          >
            <Image
              src={DeactivateAccountIcon}
              width={30}
              height={30}
              alt="settings icon"
              style={{ filter: "invert(100%)" }}
            />
            <h5 className="text-3sb font-bold text-white">
              De-activate Account
            </h5>
          </button>
        </div>
      </div>
    </div>
  );
}
