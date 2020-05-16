'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disponibilite = sequelize.define('Disponibilite', {
        dateDispo: DataTypes.DATE,
        heureDispoDebu: DataTypes.DATE,
        heureDispoFin: DataTypes.DATE
    }, {});
    Disponibilite.associate = function (models) {
        // associations can be defined here
    };
    return Disponibilite;
};