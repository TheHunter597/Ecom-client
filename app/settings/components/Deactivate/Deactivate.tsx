import Image from "next/image";
import DeactivateAccountIcon from "@/public/assets/settings/DeActivate.svg";
import { useRef, useState } from "react";
import DeactivateOverlay from "./DeactivateOverlay";
import { deactivateUser } from "../../../../utils/functions/serverActions";

export default function Deactivate() {
  const [overlayActive, setOverlayActive] = useState(false);
  const formRef = useRef(null);
  return (
    <>
      <form
        ref={formRef}
        className={`flex flex-row gap-1 items-center py-3 
        hover:bg-white duration-200
      justify-center cursor-pointer primary-color -z-10 InvertHoverButton`}
        onClick={() => {
          setOverlayActive((prev) => !prev);
        }}
        action={deactivateUser}
      >
        <div style={{ filter: "invert(100%)" }}>
          <Image
            src={DeactivateAccountIcon}
            width={30}
            height={30}
            alt="settings icon"
          />
        </div>
        <h5 className="text-3sb font-bold">De-activate</h5>
      </form>
      {overlayActive && (
        <DeactivateOverlay
          setOverlayActive={setOverlayActive}
          formRef={formRef}
        />
      )}
    </>
  );
}
