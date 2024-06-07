import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import ChangePasswordMainContent from "./changePasswordMainContent";
export default function ChangePassword() {
  return (
    <ProtectedRouteUserAuth>
      <ChangePasswordMainContent />
    </ProtectedRouteUserAuth>
  );
}
