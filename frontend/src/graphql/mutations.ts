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
    $type: String!
    $utilisateurId: ID!
  ) {
    createTestimonia(
      description: $description
      score: $score
      type: $type
      utilisateurId: $utilisateurId
    ) {
      success
      message
      testimonia {
        id
        score
        description
        type
        status
        postDate
      }
    }
  }
`;
export const UPDATE_TESTIMONIA = gql`
  mutation UpdateTestimoniaStatus($id: ID!, $status: Boolean!) {
    updateTestimoniaStatus(id: $id, status: $status) {
      success
      message
      testimonia {
        id
        score
        description
        type
        status
        postDate
      }
    }
  }
`;
export const DELETE_TESTIMONIA = gql`
  mutation DeleteTestimonia($id: ID!) {
    deleteTestimonia(id: $id) {
      success
      errors
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

// Mutation pour la creation de circuit sur mesure
export const CREATE_SUR_MESURE = gql`
  mutation CreateSurMesure(
    $pointDepart: String!
    $pointArrivee: String!
    $dateDebut: Date!
    $dateFin: Date!
    $duree: Int
    $nombreDePersonne: Int!
    $hebergement: String!
    $budget: String!
    $nom: String!
    $prenom: String!
    $email: String!
    $contact: String!
    $commentaire: String
    $lieuVisiter: [String]
    $activite: [String]
  ) {
    createSurMesure(
      pointDepart: $pointDepart
      pointArrivee: $pointArrivee
      dateDebut: $dateDebut
      dateFin: $dateFin
      duree: $duree
      nombreDePersonne: $nombreDePersonne
      hebergement: $hebergement
      budget: $budget
      nom: $nom
      prenom: $prenom
      email: $email
      contact: $contact
      commentaire: $commentaire
      lieuVisiter: $lieuVisiter
      activite: $activite
    ) {
      success
      errors
      surMesure {
        id
        pointDepart
        pointArrivee
        dateDebut
        dateFin
        duree
        nombreDePersonne
        hebergement
        budget
        nom
        prenom
        email
        contact
        commentaire
        lieuVisiter {
          nom
        }
        activite {
          nom
        }
      }
    }
  }
`;

export const CREATE_FAQ = gql`
  mutation CreateFaq($faqType: String!, $question: String!, $reponse: String!) {
    createFaq(faqType: $faqType, question: $question, reponse: $reponse) {
      success
      errors
      faq {
        id
        question
        reponse
        faqType
      }
    }
  }
`;

export const CREATE_PERSONNEL = gql`
  mutation CreatePersonnel(
    $adresse: String!
    $biographie: String!
    $contact: String!
    $email: String!
    $langues: String!
    $nom: String!
    $photo: Upload!
    $prenom: String!
    $specialite: String!
    $status: String!
  ) {
    createPersonnel(
      adresse: $adresse
      biographie: $biographie
      contact: $contact
      email: $email
      langues: $langues
      nom: $nom
      photo: $photo
      prenom: $prenom
      specialite: $specialite
      status: $status
    ) {
      success
      errors
      personnel {
        id
        nom
        prenom
        contact
        email
        adresse
        specialite
        langues
        biographie
        status
        photo
        age
        languesParlees
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUtilisateur($id: ID!) {
    deleteUtilisateur(id: $id) {
      success
      errors
    }
  }
`;

export const CREATE_CIRCUIT = gql`
  mutation CreateCircuit(
    $titre: String!
    $description: String!
    $duree: Int!
    $prix: Int!
    $type: String!
    $transport: String!
    $difficulte: String!
    $inclus: String
    $nonInclus: String
    $destination: String!
    $region: String!
    $saison: String!
    $itineraires: [ItineraireInput]!
    $images: [Upload]
  ) {
    createCircuit(
      titre: $titre
      description: $description
      duree: $duree
      prix: $prix
      type: $type
      transport: $transport
      difficulte: $difficulte
      inclus: $inclus
      nonInclus: $nonInclus
      destination: $destination
      region: $region
      saison: $saison
      itineraires: $itineraires
      images: $images
    ) {
      success
      errors
      circuit {
        id
        titre
        description
        duree
        prix
        inclus
        nonInclus
        destination
        saison
        difficulte
        type
        transport
        reservationsCount
        isAvailable
        itineraires {
          id
          jour
          lieuDepart
          lieuArrivee
          distanceKm
          dureeTrajet
          description
        }
      }
    }
  }
`;
