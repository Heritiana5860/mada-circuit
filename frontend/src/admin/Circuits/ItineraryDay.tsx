export interface ItineraryDay {
  id: string;
  jour: number;
  type: "trajet" | "sejour";

  // Champs pour les trajets
  depart?: string;
  arrivee?: string;
  distance?: number;
  duree?: number;

  // Champs pour les séjours
  lieu?: string;
  nuitees?: number;

  description: string;
  descriptionEn?: string;
}
