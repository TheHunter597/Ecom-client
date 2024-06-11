import FirstResetStep from "./components/FirstResetStep";
export const metadata = {
  title: "Reset Password",
};
export default function ResetPassword() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <FirstResetStep />,
    </div>
  );
}
