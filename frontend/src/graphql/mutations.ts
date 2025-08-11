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

// Mutation pour créer une réservation
export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $utilisateurId: ID!
    $circuitId: ID
    $vehiculeId: ID
    $dateDepart: Date!
    $dateFin: Date!
    $nombrePersonnes: Int!
    $budget: String
    $commentaire: String
  ) {
    createReservation(
      utilisateurId: $utilisateurId
      circuitId: $circuitId
      vehiculeId: $vehiculeId
      dateDepart: $dateDepart
      dateFin: $dateFin
      nombrePersonnes: $nombrePersonnes
      budget: $budget
      commentaire: $commentaire
    ) {
      success
      message
      errors
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

// Mutation pour créer testimonia
export const CREATE_TESTIMONIA = gql`
  mutation CreateTestimonia(
    $description: String!
    $score: Int!
    $utilisateurId: ID!
  ) {
    createTestimonia(
      description: $description
      score: $score
      utilisateurId: $utilisateurId
    ) {
      success
      message
      testimonia {
        id
        score
        description
        status
        postDate
      }
    }
  }
`;

// Mutation pour créer contacter nous
export const CREATE_CONTACT_US = gql`
  mutation CreateContactUsMutation(
    $nom: String!
    $prenom: String!
    $email: String!
    $contact: String!
    $objet: String!
    $message: String!
  ) {
    createContactUsMutation(
      nom: $nom
      prenom: $prenom
      email: $email
      contact: $contact
      objet: $objet
      message: $message
    ) {
      success
      message
      contactUs {
        id
        nom
        prenom
        email
        tel
        objet
        message
        dateEnvoi
      }
    }
  }
`;
