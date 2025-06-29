import { Button } from "@/components/ui/button";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import { auth, signOut } from "@/lib/auth";

const DashboardAdminPage = async () => {
  const session = await auth();

  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div>
      DashboardAdminPage
      <div>
        <form action={handleLogout}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthGuard(DashboardAdminPage);
