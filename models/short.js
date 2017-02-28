'use strict';
module.exports = function(sequelize, DataTypes) {
  var short = sequelize.define('short', {
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return short;
};