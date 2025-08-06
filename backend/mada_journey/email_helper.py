def message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire):
    return (
        f"Bonjour,\n\n"
        f"Une nouvelle demande de réservation a été effectuée via notre site.\n\n"
        f"Informations du client :\n"
        f"Nom : {utilisateur.nom} {utilisateur.prenom}\n"
        f"E-mail : {utilisateur.email}\n"
        f"Téléphone : {utilisateur.telephone}\n\n"
        f"Détails de la réservation :\n"
        f"- Dates : du {date_depart} au {date_fin}\n"
        f"- Durée : {duree} jour(s)\n"
        f"- Nombre de personnes : {nombre_personnes}\n"
        f"- Budget : {budget} Ar\n"
        f"- Demande personnalisée : {commentaire}\n\n"
        f"Veuillez contacter le client pour finaliser les détails.\n\n"
        f"Cordialement,\n"
        f"Madagascar Voyage Solidaire"
    )
    
def confirmation_message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, type_circuit):
    ligne_date = (
        f"- Circuit du {date_depart} au {date_fin} ({duree} jour(s))\n"
        if type_circuit else
        f"- Location du {date_depart} au {date_fin} ({duree} jour(s))\n"
    )
    
    return (
        f"Bonjour {utilisateur.prenom},\n\n"
        f"Nous avons bien reçu votre demande de réservation.\n"
        f"Voici un résumé :\n"
        f"{ligne_date}"
        f"- Nombre de personnes : {nombre_personnes}\n"
        f"- Budget : {budget} Ar\n"
        f"- Votre message : {commentaire}\n\n"
        f"Nous vous contacterons dans les plus brefs délais.\n"
        f"Merci pour votre confiance.\n\n"
        f"Cordialement,\n"
        f"L’équipe Madagascar Voyage Solidaire"
    )
    
def objet_message(type):
    return (f"📩 Nouvelle demande de réservation de {type}")

def objet_confirmation_message():
    return "✅ Confirmation de votre demande de réservation"

def site_mail():
    return 'heritianaronaldo@gmail.com'