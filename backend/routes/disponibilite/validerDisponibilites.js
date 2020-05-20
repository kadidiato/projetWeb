/**
 * https://express-validator.github.io/docs
 */
const {body, check, validationResult} = require('express-validator');

/**
 * Utile quand on veut filter les entrées trouvées ou faire de la
 * pagination coté serveur
 * @returns {[*, *, ValidationChain, *]}
 */
function getAll() {
    return [
        check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
        check('offset', 'invalid value for offset').optional()
            .isNumeric().bail().trim().escape(),
        check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
        check('order', 'invalid value for order').optional()
            .isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
            .trim().escape(),
    ]
}

/**
 * Verifie l'id passé dans la requete du client
 * @returns {[*]}
 */
const getById = () => {
    //console.log('get by id validator');
    return [
        check('id', 'invalid parameter id')
            .exists().withMessage('parameter id not found')
            .isNumeric().withMessage('parameter id is not numeric')
            .trim().escape(),
    ];
};

const getByProfId = () => {
    //console.log('get by id validator');
    return [
        check('profId', 'invalid parameter id')
            .exists().withMessage('parameter id not found')
            .isNumeric().withMessage('parameter id is not numeric')
            .trim().escape(),
    ];
};
/**
 * Regarde si un paramètre n'est pas fourni comme attendu et renvoie une
 * erreur et un message au client
 * @param req
 * @param res
 * @param next
 * @returns {*|Json|Promise<any>}
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    })
};

/**
 * Verifie les champs nécessaires pour reserver un cours
 * @returns {[ValidationChain, ValidationChain, *, *]}
 */
function save() {
    return [

        body('profId', 'invalid parameter id')
            .exists().withMessage('parametre eleveId introuvable')
            .isNumeric().withMessage('parametre eleveId doit être numérique')
            .trim().escape(),
        body('dateDispo', 'date de disponibilite invalide')
            .exists().withMessage('parametre heureCour introuvable').toDate(),
        body('heureDispoDebu', 'heure de debut dispo invalide')
            .exists().withMessage('parametre heureCour introuvable').toDate(),
        body('heureDispoFin', 'heure de fin  dispo invalide')
            .exists().withMessage('parametre heureCour introuvable').toDate(),

        body('description', 'description saisi est invalide')
            .exists().withMessage('parametre description introuvable').trim().escape(),

    ]
}

module.exports = {
    validate, getAll, getById, save, getByProfId
};