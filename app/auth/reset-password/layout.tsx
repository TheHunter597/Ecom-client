export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center">
      <div className="w-11/12 sm:w-5/12 md:4/12 ">{children}</div>
    </div>
  );
}
