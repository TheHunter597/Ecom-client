import Image from "next/image";
import Link from "next/link";

export default function SettingsElement({
  element,
  index,
  settingsElementsLength,
}: {
  element: {
    icon: any;
    text: string;
    link: string;
  };
  index: number;
  settingsElementsLength: number;
}) {
  return (
    <Link
      href={element.link}
      key={index}
      className={`flex flex-row gap-2 items-center p-5 justify-center cursor-pointer bg-gray-900 text-white
      hover:bg-white hover:text-black duration-200 border border-gray-700 InvertHoverButton
      ${index == settingsElementsLength - 1 ? " rounded-b-xl" : ""}  `}
    >
      <Image src={element.icon} width={30} height={30} alt="settings icon" />
      <h5 className="text-2sb font-bold">{element.text}</h5>
    </Link>
  );
}
