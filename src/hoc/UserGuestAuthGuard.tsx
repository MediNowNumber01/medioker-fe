import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function UserGuestAuthGuard(Component: any) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (session && session.user?.role !== "USER") {
      if (session.user?.role === "ADMIN") {
        return redirect("/admin");
      }
      if (session.user?.role === "SUPER_ADMIN") {
        return redirect("/superadmin");
      }
    }

    if(!session) {
      return redirect("/");
    }

    

    return <Component {...props} />;
  };
}
