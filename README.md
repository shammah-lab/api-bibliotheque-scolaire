
# API Bibliothèque Scolaire

## 1. Présentation du projet

Ce projet consiste à développer une API REST pour la gestion d'une bibliothèque scolaire.

Elle permet de gérer les utilisateurs et les livres à travers des requêtes HTTP sécurisées.

## 2. Technologies utilisées

- Node.js
- Express.js
- JSON
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- Postman

## 3. Installation du projet

Cloner le projet ou ouvrir son dossier, puis installer les dépendances :

```bash
npm install
```

## 4. Configuration

Créer un fichier `.env` à la racine du projet et ajouter :

```env
JWT_SECRET=ma_cle_secrete_bibliotheque_2026
```

## 5. Démarrage du serveur

Exécuter la commande :

```bash
node server.js
```

Le serveur démarre à l'adresse :

http://localhost:3000

## 6. Fonctionnalités

### Authentification

- Inscription d'un utilisateur.
- Connexion avec email et mot de passe.
- Génération d'un token JWT.
- Consultation du profil avec authentification.

### Gestion des livres

- Ajouter un livre.
- Afficher tous les livres.
- Consulter un livre par son identifiant.
- Modifier un livre.
- Supprimer un livre.
- Rechercher un livre par titre.
- Filtrer les livres par catégorie.
- Pagination des résultats.

## 7. Routes de l'API

### Authentification

| Méthode | Route | Description |
|---|---|---|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |
| GET | /api/auth/profile | Consulter le profil |

### Livres

| Méthode | Route | Description |
|---|---|---|
| POST | /api/books | Ajouter un livre |
| GET | /api/books | Afficher les livres |
| GET | /api/books/:id | Consulter un livre |
| PUT | /api/books/:id | Modifier un livre |
| DELETE | /api/books/:id | Supprimer un livre |
| GET | /api/books/search?title=javascript | Rechercher par titre |
| GET | /api/books?category=Informatique | Filtrer par catégorie |
| GET | /api/books?page=1&limit=5 | Pagination |

## 8. Sécurité

- Les mots de passe sont hachés avec bcryptjs.
- Les routes sensibles sont protégées par JWT.
- La clé secrète JWT est stockée dans le fichier `.env`.
- Le fichier `.env` est exclu du dépôt Git grâce à `.gitignore`.

## 9. Tests

Les différentes fonctionnalités de l'API peuvent être testées avec Postman.
