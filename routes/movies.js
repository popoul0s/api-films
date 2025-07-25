const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middlewares/auth');

// Ajout d'un film (privé)
router.post('/', auth, movieController.addMovie);

// Voir ses propres films (privé)
router.get('/', auth, movieController.getUserMovies);

// Modifier un film (privé)
router.put('/:id', auth, movieController.updateMovie);

// Supprimer un film (privé)
router.delete('/:id', auth, movieController.deleteMovie);

// Top 10 public (pas besoin d'être connecté)
router.get('/top10', movieController.getTop10);

module.exports = router;
