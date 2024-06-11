import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import ChangePasswordMainContent from "./changePasswordMainContent";
export const metadata = {
  title: "Edit Password",
};
export default function ChangePassword() {
  return (
    <ProtectedRouteUserAuth>
      <ChangePasswordMainContent />
    </ProtectedRouteUserAuth>
  );
}
