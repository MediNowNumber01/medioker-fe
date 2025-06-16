export const formatPrice = (price: number | null | undefined | string) => {
  if (typeof price === "string") {
    price = parseFloat(price);
  }
  if (price === null || price === undefined || isNaN(price)) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
