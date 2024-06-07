import Link from "next/link";

export default function navbarLink() {
  return (
    <Link href="/auth/login">
      <li className="text-3sb font-bold border-2 py-2 px-5 primary-border-color rounded-md">
        Login
      </li>
    </Link>
  );
}
