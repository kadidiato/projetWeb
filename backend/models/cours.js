'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cours = sequelize.define('Cours', {
        dateCour: DataTypes.DATE,
        heureCour: DataTypes.DATE,
        matiere: DataTypes.STRING,
        description:DataTypes.STRING
    }, {});
    Cours.associate = function (models) {
        // associations can be defined here
    };
    return Cours;
};