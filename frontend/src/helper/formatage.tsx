export function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("mg-MG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " Ar"
  );
}
