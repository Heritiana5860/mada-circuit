import { gql } from "@apollo/client";

// Queries pour les circuits
export const GET_ALL_CIRCUITS = gql`
  query AllCircuitsByType($typeCircuit: String!) {
    allCircuitsByType(typeCircuit: $typeCircuit) {
      id
      titre
      description
      duree
      prix
      inclus
      nonInclus
      image
      typeCircuit
      difficulte
      transport
      destination
      region
      saison
      images {
        id
        image
      }
      itineraires {
        jour
        typeItineraire
        lieuDepart
        lieuArrivee
        distanceKm
        dureeTrajet
        lieu
        nuitees
        description
        isTrajet
        isSejour
      }
    }
  }
`;

export const ALL_CIRCUITS = gql`
  query AllCircuits {
    allCircuits {
      id
      titre
      description
      duree
      prix
      inclus
      nonInclus
      image
      typeCircuit
      difficulte
      transport
      destination
      region
      saison
      images {
        id
        image
      }
      itineraires {
        jour
        typeItineraire
        lieuDepart
        lieuArrivee
        distanceKm
        dureeTrajet
        lieu
        nuitees
        description
        isTrajet
        isSejour
      }
    }
  }
`;

// Queries pour les véhicules
export const GET_ALL_VEHICULES = gql`
  query GetAllVehicules {
    allVehicules {
      id
      marque
      modele
      annee
      prix
      etat
      capacite
      type
      langue
      images {
        id
        image
      }
    }
  }
`;

export const GET_VEHICULE_BY_ID = gql`
  query GetVehiculeById($id: ID!) {
    vehicule(id: $id) {
      id
      marque
      modele
      annee
      prix
      etat
      capacite
      type
      langue
      images {
        id
        image
      }
    }
  }
`;

// Requête alternative utilisant le système Node de Relay
export const GET_VEHICULE_BY_NODE_ID = gql`
  query GetVehiculeByNodeId($id: ID!) {
    node(id: $id) {
      ... on VehiculeType {
        id
        marque
        modele
        annee
        prix
        image
        etat
        type {
          id
          libelle
        }
        capacite {
          id
          nombrePlaces
          description
        }
      }
    }
  }
`;

// Queries pour le blog
export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    allBlogs {
      id
      titre
      contenu
      datePublication
      auteur
      tags
      contentType
      youtubeUrl
      medias {
        id
        file
      }
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    blog(id: $id) {
      id
      titre
      contenu
      datePublication
      auteur
      tags
      medias {
        id
        file
      }
    }
  }
`;

export const GET_RECENT_BLOGS = gql`
  query GetRecentBlogs($limit: Int) {
    recentBlogs(limit: $limit) {
      id
      titre
      contenu
      image
      datePublication
      auteur
      tags
    }
  }
`;

// Queries pour les utilisateurs
export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    utilisateur(id: $id) {
      id
      email
      nom
      prenom
      telephone
      role
      dateInscription
    }
  }
`;

// Queries pour les réservations
export const GET_USER_RESERVATIONS = gql`
  query GetUserReservations($userId: ID!) {
    reservationsByUser(userId: $userId) {
      id
      dateReservation
      dateDepart
      dateFin
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
      utilisateur {
        id
        email
        nom
        prenom
        telephone
      }
      circuit {
        id
        titre
        description
        duree
        prix
        inclus
        nonInclus
        difficulte
        destination
        saison
      }
      vehicule {
        id
        marque
        modele
        prix
      }
    }
  }
`;

export const GET_ALL_RESERVATION = gql`
  query AllReservations {
    allReservations {
      id
      dateReservation
      dateDepart
      dateFin
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
      utilisateur {
        nom
        prenom
        telephone
        email
      }
      circuit {
        id
        titre
        duree
        prix
        description
        inclus
        nonInclus
        destination
        saison
        transport
        itineraires {
          jour
          lieuDepart
          lieuArrivee
          distanceKm
          dureeTrajet
          description
        }
      }
      vehicule {
        id
        marque
        modele
        annee
        prix
        capacite
        type
        etat
      }
    }
  }
`;

// Queries pour les guides
export const GET_ALL_PERSONNELS = gql`
  query AllPersonnels {
    allPersonnels {
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
    }
  }
`;

// Queries pour les FAQ
export const GET_ALL_FAQS = gql`
  query AllFaqs {
    allFaqs {
      id
      question
      reponse
      faqType
    }
  }
`;

// Testimonia query
export const GET_TESTIMONIA_BY_STATUS = gql`
  query AllTestimoniaByStatus($status: Boolean!) {
    allTestimoniaByStatus(status: $status) {
      id
      score
      description
      type
      status
      postDate
      utilisateur {
        id
        email
        nom
        prenom
        telephone
        image
      }
    }
  }
`;
export const ALL_TESTIMONIA = gql`
  query AllTestimonia {
    allTestimonia {
      id
      score
      description
      type
      status
      postDate
      utilisateur {
        id
        nom
        prenom
        email
        image
      }
    }
  }
`;

// Query pour recuperer l'utilisateur selon son email pour afficher l'image profile
export const GET_UTILISATEUR_BY_EMAIL = gql`
  query UtilisateurByEmail($email: String!) {
    utilisateurByEmail(email: $email) {
      id
      email
      nom
      prenom
      telephone
      role
      image
      dateInscription
    }
  }
`;

export const GET_ALL_USERS = gql`
  query AllUtilisateurs {
    allUtilisateurs {
      id
      email
      nom
      prenom
      telephone
      role
    }
  }
`;

// All sur mesure
export const GET_ALL_SURMESURE = gql`
  query AllSurMesure {
    allSurMesure {
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
      lieuVisiter {
        nom
      }
    }
  }
`;
