'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    datereservation: DataTypes.DATE
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
  };
  return Reservation;
};