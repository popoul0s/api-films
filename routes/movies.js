const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Ajouter un film à sa watchlist
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["à voir", "vu"]
 *               rating:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 5
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Film ajouté
 *       401:
 *         description: Authentification requise
 */
router.post('/', auth, movieController.addMovie);

router.get('/', auth, movieController.getUserMovies);

router.put('/:id', auth, movieController.updateMovie);

router.delete('/:id', auth, movieController.deleteMovie);

module.exports = router;
