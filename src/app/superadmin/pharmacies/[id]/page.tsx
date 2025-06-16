import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";

const AdminPharmacyDetailPage = () => {
  return <div>page</div>;
};

export default SuperAdminAuthGuard(AdminPharmacyDetailPage);
