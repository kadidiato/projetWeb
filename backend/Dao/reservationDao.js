const models = require('../models');


const sequelize = require('sequelize');


async function getCoursByEleve(id) {
    return models.sequelize.query("select Cours.* " +
        "from Cours join Reservations R on Cours.id = R.coursId where eleveId = ?",
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });


}

async function updateCoursStatusON(id) {
    return models.sequelize.query("UPDATE Cours SET status=0 WHERE id= ?",
        {
            replacements: [id],
            type: sequelize.QueryTypes.UPDATE
        });

}


async function updateCoursStatusOFF(id) {
    return models.sequelize.query("UPDATE Cours SET status = 1 WHERE id= ?",
        {
            replacements: [id],
            type: sequelize.QueryTypes.UPDATE
        });

}

module.exports = {
    getCoursByEleve,updateCoursStatusON,updateCoursStatusOFF

};