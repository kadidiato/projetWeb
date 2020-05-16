var express = require('express');
var router = express.Router();
var disponibilitesCtrl = require('./disponibilitesCtrl');
var validerDisponibilites = require('./validerDisponibilites');

//recuperer toutes les cours reserves
//url: GET /api/eleves
router.get('/', validerDisponibilites.getAll(), validerDisponibilites.validate, disponibilitesCtrl.getAll);

//route qui gère la recuperation d'un cours
//url: GET /api/eleves/:id
router.get('/:id', validerDisponibilites.getById(), validerDisponibilites.validate, disponibilitesCtrl.getById);

//route pour créer un cours
//url: POST /api/eleves
router.post('/', validerDisponibilites.save, validerDisponibilites.validate, disponibilitesCtrl.save)

//route pour supprimer un cours
//url: DELETE /api/eleves/:id
router.delete('/:id', validerDisponibilites.getById(),
    validerDisponibilites.validate,
    disponibilitesCtrl.destroy);


//route pour mettre à jour un cours
//url: PUT /api/reservationsCours
router.put('/', validerDisponibilites.save, validerDisponibilites.validate, disponibilitesCtrl.update)

module.exports = router;