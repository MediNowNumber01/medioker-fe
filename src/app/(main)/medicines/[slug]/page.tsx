import ProductDetailsPage from "@/features/medicine/details/ProductDetailsPage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <ProductDetailsPage slug={slug} />;
};

export default (ProductDetails);
