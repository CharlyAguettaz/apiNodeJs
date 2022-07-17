const express = require('express');
const actorsController = require('../controllers/ActorsController');

const router = express.Router();

router.get('/actor', actorsController.actors_list);
router.get('/actor/:id', actorsController.actors_get);
router.post('/actor', actorsController.actors_create);
router.put('/actor/:id', actorsController.actors_update);
router.delete('/actor/:id', actorsController.actors_delete);

module.exports = router;