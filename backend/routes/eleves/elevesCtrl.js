var models = require('../../models');

/**
 * Controller pour recuperer tous les eleves
 * @param req
 * @param res
 * @param next
 */
function getAll(req, res, next) {
    models.Eleve.findAll().then((eleve) => {
        //si je trouve pas de cours je retourne un status 404 avec un petit message
        if (!eleve)
            return res.status(404).json({
                message: 'aucun eleve  trouvé'
            });
        //si tout s'est bien passé je retourne le status 200 et le cours trouvé
        return res.status(200).json(eleve);
    }).catch((err) => {
        //Erreur serveur => envoie erreur 500 et message au client
        return res.status(500).json(err);
    })
}

/**
 * Controller pour recuperer un cours par son id
 * @param req
 * @param res
 * @param next
 */
function getById(req, res, next) {
    let uid = req.params.id;

    models.Eleve.findOne({
        where: {uid: uid}
    }).then((eleveFound) => {
        if (!eleveFound) {
            return res.status(404).json({
                status: 'error',
                message: `eleve non trouvé`
            });
        }
        return res.status(201).json(eleveFound);
    }).catch((err) => {
        return res.json(err);
    });
}

/**
 * Controller pour sauvegarder un ele
 * @param req
 * @param res
 * @param next
 */
function save(req, res, next) {
    //recuperation des infos du cours à creer
    let eleve = {
        uid: req.body.uid,
        mailEleve: req.body.mailEleve,
        nomEleve: req.body.nomEleve || "",
        prenomEleve: req.body.prenomEleve || "",
        niveauEleve: req.body.niveauEleve || "",
        rueEleve: req.body.rueEleve || "",
        villeEleve: req.body.villeEleve || "",
        zipEleve: req.body.zipEleve || "",
        paysEleve: req.body.paysEleve || "",

    };

    models.Eleve.findOne({
        where: {uid: eleve.uid}
    }).then((eleveFound) => {
        if (eleveFound) {
            return res.status(400).json({
                status: 'error',
                message: `Un eleve existe déjà avec ce id`
            });
        }
        models.Eleve.create(eleve).then((newEleve) => {
            if (!newEleve) {
                return res.status(500).json({
                    message: 'Une erreur est survenue lors de la création du cours'
                });
            }

            return res.status(201).json(newEleve);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du client',
            details: err.errors
        });
    })
}

/**
 * Controller pour supprimer un eleve par son id
 * @param req
 * @param res
 * @param next
 */
function destroy(req, res, next) {
    let eleve_id = req.params.id;

    models.Eleve.destroy({
        where: {id: eleve_id}
    }).then((destroyedEleve) => {
        return res.status(200).json(destroyedEleve);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

/**
 * Controller pour mettre à jour un cours
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next) {
    let id = req.body.id;
    let eleve = {
        nomEleve: req.body.nomEleve,
        prenomEleve: req.body.prenomEleve,
        mailEleve: req.body.mailEleve,
        niveauEleve: req.body.niveauEleve,
        rueEleve: req.body.rueEleve,
        villeEleve: req.body.villeEleve,
        zipEleve: req.body.zipEleve,
        paysEleve: req.body.paysEleve,
        datereservation: req.body.datereservation
        //heureCour: req.body.heureCour,

    };

    models.Eleve.update(eleve, {
        where: {id: id}
    }).then((updatedEleve) => {
        return res.status(200).json(updatedEleve);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}

module.exports = {
    getAll, getById, save, destroy, update,
};