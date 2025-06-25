import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function SuperAdminAuthGuard(Component: any) {
  return async function IsAuth(props: any) {
    const session = await auth();
    
    if (!session) {
      return redirect("/login");
    }
    if (session.user?.role !== "SUPER_ADMIN") {
      return redirect("/");
    }

    if (!session) {
      return redirect("/login");
    }


    return <Component {...props} />;
  };
}
