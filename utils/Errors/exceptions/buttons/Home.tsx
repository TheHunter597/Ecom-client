import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  return (
    <section className="flex flex-row gap-4 w-full">
      <Link
        href="/"
        className="border-blue-400 border text-white bg-blue-400 text-1sb px-8 py-2 rounded-md w-full"
      >
        Home
      </Link>
    </section>
  );
}
