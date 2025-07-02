import ProductDetailsPage from "@/features/medicine/details/ProductDetailsPage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  if (session && session.user.role === "ADMIN") return redirect("/admin");
  if (session && session?.user.role === "SUPER_ADMIN")
    return redirect("/superadmin");
  const { slug } = await params;
  return <ProductDetailsPage slug={slug} />;
};

export default ProductDetails;
