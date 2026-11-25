
const express = require('express');
const { readData, writeData } = require('../utils/fileUtils');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 1. AJOUTER UN LIVRE
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { titre, auteur, categorie, annee } = req.body;

        if (!titre || !auteur || !categorie || !annee) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires.'
            });
        }

        const books = await readData('books.json');

        const nouveauLivre = {
            id: Date.now(),
            titre,
            auteur,
            categorie,
            annee
        };

        books.push(nouveauLivre);
        await writeData('books.json', books);

        res.status(201).json({
            message: 'Livre ajouté avec succès.',
            livre: nouveauLivre
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de l ajout du livre.',
            error: error.message
        });
    }
});

// AFFICHER LES LIVRES AVEC FILTRAGE ET PAGINATION
router.get('/', async (req, res) => {
    try {
        const books = await readData('books.json');

        // 1. Récupérer les paramètres
        const categorie = req.query.category;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        // 2. Filtrer par catégorie si nécessaire
        let livresFiltres = books;

        if (categorie) {
            livresFiltres = books.filter(book =>
                book.categorie.toLowerCase() === categorie.toLowerCase()
            );
        }

        // 3. Calculer la pagination
        const debut = (page - 1) * limit;
        const fin = debut + limit;

        const livresPage = livresFiltres.slice(debut, fin);

        // 4. Retourner le résultat
        res.status(200).json({
            message: 'Liste des livres récupérée avec succès.',
            totalLivres: livresFiltres.length,
            pageActuelle: page,
            nombreParPage: limit,
            nombreDePages: Math.ceil(livresFiltres.length / limit),
            livres: livresPage
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des livres.',
            error: error.message
        });
    }
});

// 4. AFFICHER UN LIVRE PAR SON ID
router.get('/:id', async (req, res) => {
    try {
        const books = await readData('books.json');

        const livre = books.find(
            book => book.id === Number(req.params.id)
        );

        if (!livre) {
            return res.status(404).json({
                message: 'Livre introuvable.'
            });
        }

        res.status(200).json({
            message: 'Livre récupéré avec succès.',
            livre
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du livre.',
            error: error.message
        });
    }
});

// 5. MODIFIER UN LIVRE
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const livreId = Number(req.params.id);
        const { titre, auteur, categorie, annee } = req.body;

        if (!titre || !auteur || !categorie || !annee) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires.'
            });
        }

        const books = await readData('books.json');

        const index = books.findIndex(
            book => book.id === livreId
        );

        if (index === -1) {
            return res.status(404).json({
                message: 'Livre introuvable.'
            });
        }

        books[index] = {
            ...books[index],
            titre,
            auteur,
            categorie,
            annee
        };

        await writeData('books.json', books);

        res.status(200).json({
            message: 'Livre modifié avec succès.',
            livre: books[index]
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la modification du livre.',
            error: error.message
        });
    }
});

// 6. SUPPRIMER UN LIVRE
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const livreId = Number(req.params.id);
        const books = await readData('books.json');

        const index = books.findIndex(
            book => book.id === livreId
        );

        if (index === -1) {
            return res.status(404).json({
                message: 'Livre introuvable.'
            });
        }

        const livreSupprime = books[index];

        books.splice(index, 1);
        await writeData('books.json', books);

        res.status(200).json({
            message: 'Livre supprimé avec succès.',
            livre: livreSupprime
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du livre.',
            error: error.message
        });
    }
});

module.exports = router;
