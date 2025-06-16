import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";

const PharmaciesPage = () => {
  return <div>Pharmacies Page</div>;
};

export default SuperAdminAuthGuard(PharmaciesPage);
