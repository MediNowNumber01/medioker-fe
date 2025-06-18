import PharmacyDetail from "@/features/pharmacies/pharmacyDetail/DetailPharmacy";

const AdminPharmacyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <PharmacyDetail pharmacyId={id} />;
};

export default AdminPharmacyDetailPage;
