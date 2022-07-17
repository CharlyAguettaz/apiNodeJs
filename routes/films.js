const express = require('express');
const filmsController = require('../controllers/FilmsController');

const router = express.Router();

router.get('/film', filmsController.films_list);
router.get('/film/:id', filmsController.films_get);
router.post('/film', filmsController.films_create);
router.put('/film/:id', filmsController.films_update);
router.delete('/film/:id', filmsController.films_delete);

module.exports = router;