# Utiliser une image Python officielle
FROM python:3.12

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel Django va s'exécuter
EXPOSE 8000

# Définir la variable d'environnement pour Python
ENV PYTHONPATH=/app

# Commande pour appliquer les migrations, charger toutes les fixtures et démarrer le serveur Django
CMD ["sh", "-c", "python manage.py makemigrations && \
                  python manage.py migrate && \
                  python manage.py runserver 0.0.0.0:8000"]
