import Link from "next/link";

export default function PhoneNavbarSignLogButtons() {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <li
        className="bg-red-500 text-white list-none cursor-pointer py-2 text-3sb text-center "
        onClick={() => {
          window.location.href = "/auth/signup";
        }}
      >
        Sign Up
      </li>
      <Link href="/auth/login">
        <li className="bg-white primary-color text-3sb py-2 text-center list-none">
          Login
        </li>
      </Link>
    </div>
  );
}
