import UploadPrescriptionPage from "@/features/prescription/PrescriptionPage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function uploadPrescription() {
  const session = await auth()

  if (!session) return redirect('/login')
  if(session.user?.role === "SUPER_ADMIN") return redirect('/superadmin')
  if(session.user?.role === "ADMIN") return redirect('/admin')
  return <UploadPrescriptionPage />;
}

export default uploadPrescription