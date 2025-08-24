def message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, vehicule, circuit):
    if vehicule is not None:
        detail = (
            f"🏷️ Immatriculation    : {vehicule.immatriculation}\n"
            f"🧲 Marque             : {vehicule.marque}\n"
            f"🛡️ Modèle             : {vehicule.modele}\n"
            f"📆 Année              : {vehicule.annee}\n"
            f"💰 Prix               : {vehicule.prix} Ar /jour"
        )
        vehicule_ou_circuit = "Véhicule"
    else:
        detail = (
            f"✨ Titre          : {circuit.titre}\n"
            f"🚩 Destination    : {circuit.destination}\n"
            f"⏳ Durée          : {circuit.duree} jours\n"
            f"💰 Prix           : {circuit.prix} Ar /jour\n"
            f"👍 Inclus         : {circuit.inclus}\n"
            f"👎 Non-Inclus     : {circuit.non_inclus}\n"
        )
        vehicule_ou_circuit = "Circuit"
        
    return (
        f"Bonjour,\n\n"
        f"Une nouvelle demande de réservation a été effectuée via notre site.\n\n"
        
        f"Informations du client :\n"
        f"════════════════════════\n"
        f"👤 Nom & Prénom   : {utilisateur.nom} {utilisateur.prenom}\n"
        f"📧 E-mail         : {utilisateur.email}\n"
        f"📱 Téléphone      : {utilisateur.telephone}\n\n"
        
        f"Détails de la réservation :\n"
        f"═══════════════════════════\n"
        f"- 📅 Dates            : du {date_depart} au {date_fin}\n"
        f"- ⏳ Durée            : {duree} jour(s)\n"
        f"- 👥 Nombre de pers.  : {nombre_personnes}\n"
        f"- 💰 Budget           : {budget} Ar\n"
        
        f"💬 DEMANDE PERSONNALISÉE\n"
        f"═════════════════════════\n"
        f"{commentaire if commentaire else 'Aucun commentaire'}\n\n"
        
        f"Détails du {vehicule_ou_circuit} :\n"
        f"══════════════════════════════════\n"
        f"{detail} \n\n"
        
        f"Veuillez contacter le client pour finaliser les détails.\n\n"
        f"Cordialement,\n"
        f"Madagascar Voyage Solidaire"
    )
    
def confirmation_message(utilisateur, date_depart, date_fin, duree, nombre_personnes, budget, commentaire, type_circuit):
    ligne_date = (
        f"- 📅 Circuit du {date_depart} au {date_fin} ({duree} jour(s))\n"
        if type_circuit else
        f"- 📅 Location du {date_depart} au {date_fin} ({duree} jour(s))\n"
    )
    
    return (
        f"Bonjour {utilisateur.prenom},\n\n"
        f"Nous avons bien reçu votre demande de réservation.\n"
        f"Voici un résumé :\n"
        f"═════════════════\n"
        f"{ligne_date}"
        f"- 👥 Nombre de pers.      : {nombre_personnes}\n"
        f"- 💰 Budget               : {budget} Ar\n"
        
        f"💬 DEMANDE PERSONNALISÉE\n"
        f"═════════════════════════\n"
        f"{commentaire if commentaire else 'Aucun commentaire'}\n\n"
        
        f"Nous vous contacterons dans les plus brefs délais.\n"
        f"Merci pour votre confiance.\n\n"
        f"Cordialement,\n"
        f"L’équipe Madagascar Voyage Solidaire"
    )
    
def sur_mesure_message(point_depart, point_arrivee, lieu_visiter, activite, date_debut, date_fin, duree, nombre_de_personne, hebergement, budget, nom, prenom, email, contact, commentaire):
    return (
        f"Bonjour,\n\n"
        f"Une nouvelle demande de devis de circuit sur mesure a été effectuée via notre site.\n\n"
        
        f"📌 INFORMATIONS DU CLIENT\n"
        f"══════════════════════════\n"
        f"👤 Nom & Prénom : {nom} {prenom}\n"
        f"📧 E-mail       : {email}\n"
        f"📱 Téléphone    : {contact}\n\n"
        
        f"🗺️ DÉTAILS DU DEVIS\n"
        f"════════════════════\n"
        f"📅 Dates            : du {date_debut} au {date_fin}\n"
        f"🚩 Itinéraire       : {point_depart} → {point_arrivee}\n"
        f"🏞️ Lieux à visiter  : {lieu_visiter}\n"
        f"🎯 Activité(s)      : {activite}\n"
        f"⏳ Durée            : {duree} jour(s)\n"
        f"👥 Nombre de pers.  : {nombre_de_personne}\n"
        f"🏨 Hébergement      : {hebergement}\n"
        f"💰 Budget           : {budget}\n\n"
        
        f"💬 DEMANDE PERSONNALISÉE\n"
        f"═════════════════════════\n"
        f"{commentaire if commentaire else 'Aucun commentaire'}\n\n"
        
        f"Cordialement,\n"
        f"L’équipe Madagascar Voyage Solidaire"
    )
    
def confirmation_message_sur_mesure(point_depart, point_arrivee, lieu_visiter, activite, date_debut, date_fin, duree, nombre_de_personne, hebergement, budget, prenom, commentaire):
    
    return (
        f"Bonjour {prenom},\n\n"
        f"Nous avons bien reçu votre demande du devis sur mesure.\n\n"
        f"Voici un résumé :\n"
        f"═════════════════\n"
        f"📅 Dates            : du {date_debut} au {date_fin}\n"
        f"🚩 Itinéraire       : {point_depart} → {point_arrivee}\n"
        f"🏞️ Lieux à visiter  : {lieu_visiter}\n"
        f"🎯 Activité(s)      : {activite}\n"
        f"⏳ Durée            : {duree} jour(s)\n"
        f"👥 Nombre de pers.  : {nombre_de_personne}\n"
        f"🏨 Hébergement      : {hebergement}\n"
        f"💰 Budget           : {budget}\n\n"
        
        f"══════════════════════════════\n"
        f"💬 DEMANDE PERSONNALISÉE\n"
        f"{commentaire if commentaire else 'Aucun commentaire'}\n\n"
        
        f"Nous vous contacterons dans les plus brefs délais.\n"
        f"Merci pour votre confiance.\n\n"
        f"Cordialement,\n"
        f"L’équipe Madagascar Voyage Solidaire"
    )
    
def objet_message(type):
    return (f"📩 Nouvelle demande de réservation de {type}")

def objet_message_sur_mesure():
    return (f"📩 Nouvelle demande de devis du circuit sur mesure")

def objet_confirmation_message():
    return "✅ Confirmation de votre demande de réservation"

def objet_confirmation_message_sur_mesure():
    return "✅ Confirmation de votre demande de devis du circuit sur mesure"

def site_mail():
    return 'info@madagascar-voyagesolidaire.com'