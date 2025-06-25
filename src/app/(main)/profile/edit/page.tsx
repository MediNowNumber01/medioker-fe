import EditProfilePage from "@/features/profile/edit/EditProfilePage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";

function editProfile() {
  return <EditProfilePage />;
}

export default UserGuestAuthGuard(editProfile);