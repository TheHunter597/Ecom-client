import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginHome() {
  const router = useRouter();
  return (
    <section className="flex flex-row gap-4 min-w-fit">
      <Link
        className="bg-red-500  text-2sb px-8 py-2 rounded-md border-2 text-white
         border-red-500   duration-300 min-w-fit"
        href={"/auth/login"}
      >
        Login page
      </Link>
      <Link
        className="border-blue-400 border text-white bg-blue-400 text-2sb px-8 py-2 rounded-md w-full"
        href={"/"}
      >
        Home
      </Link>
    </section>
  );
}
