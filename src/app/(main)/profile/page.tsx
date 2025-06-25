import ProfilePage from "@/features/profile/ProfilePage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";

function profilePage() {
  return <ProfilePage />;
}

export default UserGuestAuthGuard(profilePage);