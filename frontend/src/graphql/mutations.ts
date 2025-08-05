import { gql } from "@apollo/client";

// Mutation pour créer une réservation de véhicule
export const CREATE_VEHICLE_RESERVATION = gql`
  mutation CreateVehiculeReservation(
    $utilisateurId: ID!
    $vehiculeId: ID!
    $dateDepart: Date!
    $dateFin: Date!
    $nombrePersonnes: Int!
    $budget: String
    $commentaire: String
  ) {
    createVehiculeReservation(
      utilisateurId: $utilisateurId
      vehiculeId: $vehiculeId
      dateDepart: $dateDepart
      dateFin: $dateFin
      nombrePersonnes: $nombrePersonnes
      budget: $budget
      commentaire: $commentaire
    ) {
      success
      message
      reservation {
        id
        dateReservation
        dateDepart
        statut
        duree
        nombrePersonnes
        hebergement
        activite
        budget
        nom
        prenom
        email
        telephone
        commentaire
        prixTotal
      }
    }
  }
`;

// Mutation pour annuler une réservation de véhicule
export const CANCEL_VEHICLE_RESERVATION = gql`
  mutation CancelVehicleReservation($id: ID!) {
    cancelVehicleReservation(id: $id) {
      id
      statut
    }
  }
`;

// Mutation pour vérifier la disponibilité d'un véhicule
export const CHECK_VEHICLE_AVAILABILITY = gql`
  mutation CheckVehicleAvailability(
    $vehiculeId: ID!
    $dateDepart: Date!
    $dateFin: Date!
  ) {
    checkVehicleAvailability(
      vehiculeId: $vehiculeId
      dateDepart: $dateDepart
      dateFin: $dateFin
    ) {
      disponible
      message
      reservationsExistantes {
        dateDepart
        duree
      }
    }
  }
`;

// Mutation pour créer une réservation CIRCUIT
export const CREATE_CIRCUIT_RESERVATION = gql`
  mutation CreateCircuitReservation(
    $utilisateurId: ID!
    $circuitId: ID!
    $dateDepart: Date!
    $dateFin: Date!
    $nombrePersonnes: Int!
    $budget: String
    $commentaire: String
  ) {
    createCircuitReservation(
      utilisateurId: $utilisateurId
      circuitId: $circuitId
      dateDepart: $dateDepart
      dateFin: $dateFin
      nombrePersonnes: $nombrePersonnes
      budget: $budget
      commentaire: $commentaire
    ) {
      success
      message
      reservation {
        dateReservation
        id
        dateDepart
        statut
        duree
        nombrePersonnes
        hebergement
        budget
        nom
        prenom
        email
        telephone
        commentaire
        utilisateur {
          id
          email
          nom
          prenom
          telephone
          role
        }
        circuit {
          id
          titre
          description
          duree
          prix
          inclus
          nonInclus
          itineraires {
            id
            jour
            lieuDepart
            lieuArrivee
            distanceKm
            dureeTrajet
            description
            carteGps
          }
        }
      }
    }
  }
`;
