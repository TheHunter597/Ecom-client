export default function AuthContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-11 px-5 border rounded-md text-gray-100 shadow-md bg-white w-full">
      {children}
    </div>
  );
}
