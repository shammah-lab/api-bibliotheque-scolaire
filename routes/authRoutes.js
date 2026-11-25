
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { readData, writeData } = require('../utils/fileUtils');

const router = express.Router();

// 1. ROUTE DE TEST
router.get('/test', (req, res) => {
    res.json({
        message: 'Les routes d authentification fonctionnent !'
    });
});

// 2. ROUTE D'INSCRIPTION
router.post('/register', async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        if (!nom || !email || !password) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires.'
            });
        }

        const users = await readData('users.json');

        const utilisateurExiste = users.find(
            user => user.email === email
        );

        if (utilisateurExiste) {
            return res.status(409).json({
                message: 'Cette adresse email est déjà utilisée.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nouvelUtilisateur = {
            id: Date.now(),
            nom,
            email,
            password: hashedPassword
        };

        users.push(nouvelUtilisateur);

        await writeData('users.json', users);

        res.status(201).json({
            message: 'Inscription réussie !',
            utilisateur: {
                id: nouvelUtilisateur.id,
                nom: nouvelUtilisateur.nom,
                email: nouvelUtilisateur.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de l inscription.',
            error: error.message
        });
    }
});

// 3. ROUTE DE CONNEXION
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe obligatoires.'
            });
        }

        const users = await readData('users.json');

        const user = users.find(
            utilisateur => utilisateur.email === email
        );

        if (!user) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect.'
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect.'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Connexion réussie !',
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la connexion.',
            error: error.message
        });
    }
});

// 4. ROUTE POUR CONSULTER LE PROFIL
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const users = await readData('users.json');

        const user = users.find(
            utilisateur => utilisateur.id === req.user.id
        );

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable.'
            });
        }

        res.status(200).json({
            message: 'Profil récupéré avec succès.',
            utilisateur: {
                id: user.id,
                nom: user.nom,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du profil.',
            error: error.message
        });
    }
});

// EXPORTER LE ROUTEUR
module.exports = router;
