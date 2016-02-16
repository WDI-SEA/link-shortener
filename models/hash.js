'use strict';
module.exports = function(sequelize, DataTypes) {
  var hash = sequelize.define('hash', {
    url: DataTypes.STRING,
    hash: DataTypes.STRING,
    clickCount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return hash;
};