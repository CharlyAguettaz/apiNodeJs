const express = require('express');
const genresController = require('../controllers/GenresController');

const router = express.Router();

router.get('/genre', genresController.genres_list);
router.post('/genre', genresController.genres_create);
router.delete('/genre/:id', genresController.genres_delete);

module.exports = router;