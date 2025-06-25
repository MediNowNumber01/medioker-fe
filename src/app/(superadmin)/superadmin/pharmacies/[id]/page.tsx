import PharmacyDetail from "@/features/pharmacies/pharmacyDetail/DetailPharmacy";
import { redirect } from "next/navigation";

const AdminPharmacyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!id) {
    redirect("/superadmin/pharmacies");
  }
  return <PharmacyDetail pharmacyId={id} />;
};

export default AdminPharmacyDetailPage;
