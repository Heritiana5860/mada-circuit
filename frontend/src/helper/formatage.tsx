// export function formatPrice(price: number) {
//   return (
//     new Intl.NumberFormat("mg-MG", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(price) + " Ar"
//   );
// }

// Formatage en Euro
export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0, // pas de décimales
    maximumFractionDigits: 0,
  }).format(price);
}

// Formatage en Dollar
// export function formatPriceUSD(price: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(price);
// }

export const formatterUS = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
