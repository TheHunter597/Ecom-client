import Image from "next/image";
import Link from "next/link";

interface SideNavElementProps {
  icon: any;
  text: string;
  alt: string;
  link: string;
  phoneView: boolean;
}

export default function SideNavElement({
  icon,
  text,
  alt,
  link,
  phoneView,
}: SideNavElementProps) {
  if (!phoneView) {
    return (
      <div className="w-full text-left hover:bg-blue-400 duration-300 hover:text-white px-2 py-3">
        <Link
          href={link}
          className="flex flex-row gap-2 items-center font-bold  cursor-pointer px-3"
        >
          <Image src={icon} alt={alt} />
          {text}
        </Link>
      </div>
    );
  } else {
    console.log({ link }, link.includes("port"));

    return (
      <Link
        href={link}
        className="w-full py-2 hover:bg-blue-400 duration-300 h-full "
      >
        <span className="flex text-4sb text-white flex-row gap-2 items-center text-center font-bold cursor-pointer px-3">
          <Image width={26} height={26} src={icon} alt={alt} />
          {text}
        </span>
      </Link>
    );
  }
}
