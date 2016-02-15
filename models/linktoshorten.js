'use strict';
module.exports = function(sequelize, DataTypes) {
  var linkToShorten = sequelize.define('linkToShorten', {
    link: DataTypes.STRING,
    short: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return linkToShorten;
};