import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const DashboardAdminPage = () => {
  return <div>DashboardAdminPage</div>;
};

export default AdminAuthGuard(DashboardAdminPage);
