import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import ProfileEditContent from "./ProfileEditContent";
export const metadata = {
  title: "Edit Profile",
};
export default function ProfileEdit() {
  return (
    <ProtectedRouteUserAuth>
      <ProfileEditContent />
    </ProtectedRouteUserAuth>
  );
}
