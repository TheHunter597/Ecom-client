import Image from "next/image";
import EmptyCircleIcon from "@/public/assets/cart/EmptyCircle.svg";
import FulFilledCircleIcon from "@/public/assets/cart/FulFilledCircle.svg";
import PendingCircleIcon from "@/public/assets/cart/PendingCircle.svg";
import rightArrow from "@/public/assets/arrows/CartRightArrow.svg";
export default function StepsHeader({
  step,
  text,
  currentStep,
  setCurrentStep,
}: {
  step: number;
  text: string;
  currentStep: number;
  setCurrentStep: Function;
}) {
  return (
    <div
      className="flex flex-row gap-2 sm:gap-6 items-center justify-center cursor-pointer"
      onClick={() => {
        if (currentStep > step) {
          setCurrentStep(() => step);
        }
      }}
    >
      <div className="flex flex-row gap-2 sm:gap-4 items-center">
        <Image
          width={26}
          height={26}
          src={
            currentStep == step
              ? PendingCircleIcon
              : currentStep > step
              ? FulFilledCircleIcon
              : EmptyCircleIcon
          }
          alt={`${text}-step`}
        />
        <span className="text-3sb primary-color">{text}</span>
      </div>
      {step != 2 ? (
        <Image src={rightArrow} alt="right arrow" width={10} height={10} />
      ) : (
        <></>
      )}
    </div>
  );
}
