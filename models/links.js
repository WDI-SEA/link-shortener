'use strict';
module.exports = function(sequelize, DataTypes) {
  var links = sequelize.define('links', {
    counter: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return links;
};