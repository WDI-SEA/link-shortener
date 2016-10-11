'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    url: DataTypes.TEXT,
    hash: DataTypes.STRING,
    clickCount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};