import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import ExplorePage from "../../../features/medicine/explore/ExplorePage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Explore = async () => {
  const session = await auth();
  if (session && session.user.role === "ADMIN") return redirect("/admin");
  if (session && session?.user.role === "SUPER_ADMIN")
    return redirect("/superadmin");
  return <ExplorePage />;
};

export default Explore;
