import UpdatePharmacy from "@/features/pharmacies/updatePharmacy/UpdatePharmacy";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <UpdatePharmacy pharmacyId={id} />;
};

export default page;
