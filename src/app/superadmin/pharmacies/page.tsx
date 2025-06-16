import Pharmaciest from "@/features/pharmacies/dashboard/Pharmaciest";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";

const PharmaciesPage = () => {
  return <Pharmaciest />;
};

export default SuperAdminAuthGuard(PharmaciesPage);
