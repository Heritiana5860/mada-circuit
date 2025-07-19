#!/usr/bin/env python
"""
Script pour créer un utilisateur administrateur pour Madagascar Journey
"""

import os
import sys
import django

# Ajouter le répertoire du projet au path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'explore_mada_journey.settings')
django.setup()

from mada_journey.models import Utilisateur, Role

def create_admin_user():
    """
    Crée un utilisateur administrateur par défaut
    """
    print("🏝️  Madagascar Journey - Création d'un administrateur")
    print("=" * 50)
    
    # Vérifier si un admin existe déjà
    existing_admin = Utilisateur.objects.filter(role=Role.ADMIN).first()
    if existing_admin:
        print(f"⚠️  Un administrateur existe déjà : {existing_admin.email}")
        response = input("Voulez-vous créer un nouvel administrateur ? (o/N): ")
        if response.lower() not in ['o', 'oui', 'y', 'yes']:
            print("❌ Création annulée.")
            return
    
    print("\n📝 Veuillez saisir les informations de l'administrateur :")
    
    # Saisie des informations
    while True:
        email = input("Email : ").strip()
        if email and '@' in email:
            # Vérifier si l'email existe déjà
            if Utilisateur.objects.filter(email=email).exists():
                print("❌ Cet email est déjà utilisé. Veuillez en choisir un autre.")
                continue
            break
        print("❌ Veuillez saisir un email valide.")
    
    while True:
        nom = input("Nom : ").strip()
        if nom:
            break
        print("❌ Le nom est obligatoire.")
    
    while True:
        prenom = input("Prénom : ").strip()
        if prenom:
            break
        print("❌ Le prénom est obligatoire.")
    
    telephone = input("Téléphone (optionnel) : ").strip() or None
    
    while True:
        password = input("Mot de passe (min. 6 caractères) : ").strip()
        if len(password) >= 6:
            break
        print("❌ Le mot de passe doit contenir au moins 6 caractères.")
    
    # Confirmation
    print(f"\n📋 Récapitulatif :")
    print(f"Email : {email}")
    print(f"Nom : {nom}")
    print(f"Prénom : {prenom}")
    print(f"Téléphone : {telephone or 'Non renseigné'}")
    print(f"Rôle : Administrateur")
    
    confirm = input("\n✅ Confirmer la création ? (O/n): ")
    if confirm.lower() in ['n', 'non', 'no']:
        print("❌ Création annulée.")
        return
    
    try:
        # Créer l'utilisateur administrateur
        admin_user = Utilisateur.objects.create_user(
            username=email,
            email=email,
            password=password,
            nom=nom,
            prenom=prenom,
            telephone=telephone,
            role=Role.ADMIN,
            is_staff=True,
            is_superuser=True
        )
        
        print(f"\n🎉 Administrateur créé avec succès !")
        print(f"📧 Email : {admin_user.email}")
        print(f"👤 Nom : {admin_user.prenom} {admin_user.nom}")
        print(f"🔑 ID : {admin_user.id}")
        print(f"👑 Rôle : {admin_user.role}")
        
        print(f"\n🚀 Vous pouvez maintenant vous connecter avec :")
        print(f"   Email : {email}")
        print(f"   Mot de passe : [le mot de passe saisi]")
        print(f"   URL : http://localhost:5173/login")
        
    except Exception as e:
        print(f"❌ Erreur lors de la création : {e}")
        return False
    
    return True

def create_default_admin():
    """
    Crée un administrateur par défaut avec des données prédéfinies
    """
    print("🏝️  Création d'un administrateur par défaut...")
    
    default_data = {
        'email': 'admin@madagascar-journey.com',
        'password': 'admin123',
        'nom': 'Admin',
        'prenom': 'Madagascar',
        'telephone': '+261 34 123 4567'
    }
    
    # Vérifier si l'email existe déjà
    if Utilisateur.objects.filter(email=default_data['email']).exists():
        print(f"⚠️  L'administrateur par défaut existe déjà : {default_data['email']}")
        return False
    
    try:
        admin_user = Utilisateur.objects.create_user(
            username=default_data['email'],
            email=default_data['email'],
            password=default_data['password'],
            nom=default_data['nom'],
            prenom=default_data['prenom'],
            telephone=default_data['telephone'],
            role=Role.ADMIN,
            is_staff=True,
            is_superuser=True
        )
        
        print(f"✅ Administrateur par défaut créé !")
        print(f"📧 Email : {default_data['email']}")
        print(f"🔑 Mot de passe : {default_data['password']}")
        print(f"🌐 Connexion : http://localhost:8080/login")
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur : {e}")
        return False

def main():
    """
    Fonction principale
    """
    print("🏝️  Madagascar Journey - Gestion des administrateurs")
    print("=" * 55)
    
    print("\nOptions disponibles :")
    print("1. Créer un administrateur personnalisé")
    print("2. Créer un administrateur par défaut (admin@madagascar-journey.com)")
    print("3. Lister les administrateurs existants")
    print("4. Quitter")
    
    while True:
        choice = input("\nVotre choix (1-4) : ").strip()
        
        if choice == '1':
            create_admin_user()
            break
        elif choice == '2':
            create_default_admin()
            break
        elif choice == '3':
            print("\n👥 Administrateurs existants :")
            admins = Utilisateur.objects.filter(role=Role.ADMIN)
            if admins.exists():
                for admin in admins:
                    print(f"   📧 {admin.email} - {admin.prenom} {admin.nom}")
            else:
                print("   Aucun administrateur trouvé.")
            continue
        elif choice == '4':
            print("👋 Au revoir !")
            break
        else:
            print("❌ Choix invalide. Veuillez saisir 1, 2, 3 ou 4.")

if __name__ == '__main__':
    main()
