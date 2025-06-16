import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import ExplorePage from "../feature/medicine/explore/ExplorePage";

const Explore = () => {
  return <ExplorePage />;
};

export default UserGuestAuthGuard(Explore);
