export function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("mg-MG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " Ar"
  );
}

export const formatterUS = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
