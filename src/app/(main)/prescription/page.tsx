import UploadPrescriptionPage from "@/features/prescription/PrescriptionPage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";

function uploadPrescription() {
  return <UploadPrescriptionPage />;
}

export default UserGuestAuthGuard(uploadPrescription)