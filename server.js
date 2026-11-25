const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = 3000;

// Middleware pour lire les données JSON
app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l API de la bibliotheque scolaire !');
});

// Connexion des routes d'authentification
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});