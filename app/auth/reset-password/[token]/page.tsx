import ResetPasswordConfirmedMainContent from "./ResetPasswordConfirmedMainContent";

export const metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return <ResetPasswordConfirmedMainContent params={params} />;
}
