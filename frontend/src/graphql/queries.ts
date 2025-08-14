import { gql } from "@apollo/client";

// Queries pour les circuits
export const GET_ALL_CIRCUITS = gql`
  query AllCircuitsByType($type: String!) {
    allCircuitsByType(type: $type) {
      id
      titre
      description
      duree
      prix
      inclus
      nonInclus
      image
      type
      difficulte
      transport
      reservationsCount
      isAvailable
      imagesCount
      images {
        id
        image
      }
      destination {
        id
        nom
        region
      }
      saison {
        id
        nom
      }
      pointsInteret {
        id
        nom
        description
        type
        tempsVisite
        prixEntree
      }
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
`;

export const GET_CIRCUIT_BY_ID = gql`
  query Circuit($id: ID) {
    circuit(id: $id) {
      id
      titre
      description
      duree
      prix
      inclus
      nonInclus
      image
      difficulte
      transport
      reservationsCount
      isAvailable
      imagesCount
      images {
        id
        image
      }
      destination {
        id
        nom
        description
        region
        pays
        circuitsCount
        imagesCount
      }
      saison {
        id
        nom
      }
      pointsInteret {
        id
        nom
        description
        type
        tempsVisite
        prixEntree
      }
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
`;

export const GET_CIRCUITS_BY_DESTINATION = gql`
  query GetCircuitsByDestination($destinationId: ID!) {
    circuitsByDestination(destinationId: $destinationId) {
      id
      titre
      description
      duree
      prix
      difficulte
      images {
        id
        image
      }
      destination {
        id
        nom
        region
      }
    }
  }
`;

// Queries pour les destinations
export const GET_ALL_DESTINATIONS = gql`
  query GetAllDestinations {
    allDestinations {
      id
      nom
      description
      region
      pays
      image
      circuitsCount
    }
  }
`;

export const GET_POPULAR_DESTINATIONS = gql`
  query GetPopularDestinations($limit: Int) {
    popularDestinations(limit: $limit) {
      id
      nom
      description
      region
      pays
      image
      circuitsCount
    }
  }
`;

// Queries pour les véhicules
export const GET_ALL_VEHICULES = gql`
  query GetAllVehicules {
    allVehicules {
      id
      immatriculation
      marque
      modele
      annee
      prix
      etat
      images {
        id
        image
      }
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
`;

export const GET_VEHICULE_BY_ID = gql`
  query GetVehiculeById($id: ID!) {
    vehicule(id: $id) {
      id
      immatriculation
      marque
      modele
      annee
      prix
      etat
      images {
        id
        image
      }
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
`;

// Requête alternative utilisant le système Node de Relay
export const GET_VEHICULE_BY_NODE_ID = gql`
  query GetVehiculeByNodeId($id: ID!) {
    node(id: $id) {
      ... on VehiculeType {
        id
        immatriculation
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

// Requête pour récupérer tous les types de véhicules
export const GET_ALL_TYPES_VEHICULES = gql`
  query GetAllTypesVehicules {
    allTypesVehicule {
      id
      libelle
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
      image
      datePublication
      auteur
      tags
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    blog(id: $id) {
      id
      titre
      contenu
      image
      imageUrl
      datePublication
      auteur
      tags
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
        destination {
          id
          nom
          region
          pays
        }
        saison {
          id
          nom
        }
      }
      vehicule {
        id
        immatriculation
        marque
        modele
        prix
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
  query GetAllFaqs {
    allFaqs {
      id
      question
      reponse
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
      status
      postDate
      utilisateur {
        id
        email
        nom
        prenom
        telephone
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
