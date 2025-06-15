import ProductDetailsPage from "@/app/feature/medicine/details/ProductDetailsPage";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <ProductDetailsPage slug={slug} />;
};

export default ProductDetails;
