'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cours = sequelize.define('Cours', {
        dateCour: DataTypes.DATE,
        heureCour: DataTypes.DATE
    }, {});
    Cours.associate = function (models) {
        // associations can be defined here
    };
    return Cours;
};