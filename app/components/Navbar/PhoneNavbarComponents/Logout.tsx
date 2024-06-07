import Image from "next/image";
import LogoutIcon from "@/public/assets/nav/Logout.svg";
import { signOut } from "@/utils/functions/serverActions";

export default function Logout() {
  return (
    <form
      className="w-full py-2 hover:bg-blue-400 bg-red-400 duration-300 "
      action={signOut}
    >
      <button className="flex text-4sb text-white flex-row gap-2 items-center text-center font-bold cursor-pointer px-3">
        <Image width={26} height={26} src={LogoutIcon} alt={"logout icon"} />
        Logout
      </button>
    </form>
  );
}
