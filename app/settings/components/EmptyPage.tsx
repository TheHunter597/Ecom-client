import EmptyImage from "@/public/images/empty/empty.png";
import EmptyImageTwo from "@/public/images/empty/empty2.png";
import EmptyImageThree from "@/public/images/empty/empty3.png";
import Image from "next/image";
import { useMemo } from "react";

export default function EmptyPage({ text }: { text: string }) {
  const images = useMemo(
    () => [EmptyImage, EmptyImageTwo, EmptyImageThree],
    []
  );
  const randomImage = useMemo(
    () => Math.floor(Math.random() * images.length),
    [images]
  );
  return (
    <div className="text-red-500 self-center flex flex-col gap-8 items-center justify-center">
      <span className="text-2xl font-bold">{text}</span>

      <Image
        src={images[randomImage]}
        width={400}
        height={400}
        alt="empty image"
      />
    </div>
  );
}
