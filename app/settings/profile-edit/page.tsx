import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import ProfileEditContent from "./ProfileEditContent";

export default function ProfileEdit() {
  return (
    <ProtectedRouteUserAuth>
      <ProfileEditContent />
    </ProtectedRouteUserAuth>
  );
}
