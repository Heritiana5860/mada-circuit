import { gql } from '@apollo/client';

// Mutation pour créer une réservation de véhicule
export const CREATE_VEHICLE_RESERVATION = gql`
  mutation CreateVehicleReservation(
    $vehiculeId: ID!
    $dateDebut: String!
    $dateFin: String!
    $nombrePersonnes: Int!
    $prixTotal: Float!
    $commentaires: String
  ) {
    createVehicleReservation(
      vehiculeId: $vehiculeId
      dateDebut: $dateDebut
      dateFin: $dateFin
      nombrePersonnes: $nombrePersonnes
      prixTotal: $prixTotal
      commentaires: $commentaires
    ) {
      id
      dateReservation
      dateDebut
      dateFin
      nombrePersonnes
      prixTotal
      statut
      vehicule {
        id
        marque
        modele
        typeVehicule {
          nom
        }
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
    $dateDebut: String!
    $dateFin: String!
  ) {
    checkVehicleAvailability(
      vehiculeId: $vehiculeId
      dateDebut: $dateDebut
      dateFin: $dateFin
    ) {
      disponible
      message
      reservationsExistantes {
        dateDebut
        dateFin
      }
    }
  }
`; 