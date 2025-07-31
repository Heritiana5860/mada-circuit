// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  telephone?: string;
  role: string;
  dateInscription: string;
}

// Types pour les destinations
export interface Destination {
  id: string;
  nom: string;
  description: string;
  region: string;
  pays: string;
  image?: string;
  circuitsCount?: number;
}

// Types pour les saisons
export interface Saison {
  id: string;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
}

// pointsInteret
export interface PointsInteret {
  id: string;
  nom: string;
  description: string;
  image?: string;
}

// Types pour les circuits
export interface CircuitImage {
  id: string;
  image: string;
}

// Types pour les itineraire
export interface Itineraires {
  id: string;
  titre: string;
  description: string;
}

export interface Circuit {
  id: string;
  titre: string;
  description: string;
  duree: number;
  prix: number;
  difficulte: 'FACILE' | 'MOYEN' | 'DIFFICILE';
  destination: Destination;
  saison: Saison;
  pointsInteret?: PointsInteret[];
  itineraires?: Itineraires[];
  images?: CircuitImage[];
}

// Types pour les véhicules
export interface TypeVehicule {
  id: string;
  libelle: string;
  vehicules_count?: number;
}

export interface Capacite {
  id: string;
  nombrePlaces: number;
  description?: string;
}

export interface VehiculeImage {
  id: string;
  image: string;
}

export interface Vehicule {
  id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  etat: 'DISPONIBLE' | 'RESERVE' | 'MAINTENANCE';
  type: TypeVehicule;
  capacite: Capacite;
  images?: VehiculeImage[];
}

// Types pour le blog
export interface BlogImage {
  id: string;
  image: string;
}

export interface Blog {
  id: string;
  titre: string;
  contenu: string;
  image?: string;
  imageUrl?: string;
  datePublication: string;
  auteur: string;
  tags?: string[];
  images?: BlogImage[];
}

// Types pour les réservations
export interface Reservation {
  id: string;
  dateReservation: string;
  dateDebut: string;
  dateFin: string;
  nombrePersonnes: number;
  prixTotal: number;
  statut: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE' | 'TERMINEE';
  circuit?: Circuit;
  vehicule?: Vehicule;
  utilisateur: User;
}

export interface ReservationVehicule {
  id: string;
  date_reservation: string;
  date_depart: string;
  date_fin: string;
  statut: 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE' | 'TERMINEE';
  nombre_personnes: number;
  prix_total: number;
  commentaire?: string;
  vehicule: {
    id: string;
    marque: string;
    modele: string;
    type: {
      libelle: string;
    };
  };
}

export interface DisponibiliteVehicule {
  disponible: boolean;
  message?: string;
  reservations_existantes?: {
    date_depart: string;
    date_fin: string;
  }[];
}

// Types pour les guides
export interface Guide {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  langues: string[];
  specialites: string[];
  tarif: number;
  disponible: boolean;
}

// Types pour les FAQ
export interface Faq {
  id: string;
  question: string;
  reponse: string;
  categorie: string;
  ordre: number;
}

// Types pour les points d'intérêt
export interface PointInteret {
  id: string;
  nom: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;
  destination: Destination;
}

// Types pour les messages/contacts
export interface Message {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  dateEnvoi: string;
  traite: boolean;
}

// Types pour les commentaires de blog
export interface BlogCommentaire {
  id: string;
  contenu: string;
  datePublication: string;
  auteur: User;
  blog: Blog;
}

// Types pour les formulaires
export interface ContactFormData {
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
}

export interface ReservationFormData {
  circuitId?: string;
  vehiculeId?: string;
  dateDebut: string;
  dateFin: string;
  nombrePersonnes: number;
  commentaires?: string;
}

// Types pour les filtres
export interface CircuitFilters {
  destination?: string;
  difficulte?: string;
  dureeMin?: number;
  dureeMax?: number;
  prixMin?: number;
  prixMax?: number;
  saison?: string;
}

export interface VehiculeFilters {
  typeVehicule?: string;
  capaciteMin?: number;
  prixMin?: number;
  prixMax?: number;
  etat?: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Types pour la pagination
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Types pour les statistiques
export interface DashboardStats {
  totalCircuits: number;
  totalVehicules: number;
  totalReservations: number;
  totalUtilisateurs: number;
  revenus: number;
}

// Enums
export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  GUIDE = 'GUIDE',
  COMMERCIAL = 'COMMERCIAL'
}

export enum Difficulte {
  FACILE = 'FACILE',
  MOYEN = 'MOYEN',
  DIFFICILE = 'DIFFICILE'
}

export enum EtatVehicule {
  DISPONIBLE = 'DISPONIBLE',
  LOUE = 'LOUE',
  MAINTENANCE = 'MAINTENANCE'
}

export enum StatutReservation {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRMEE = 'CONFIRMEE',
  ANNULEE = 'ANNULEE',
  TERMINEE = 'TERMINEE'
}
