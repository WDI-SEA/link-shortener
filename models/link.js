'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    id: DataTypes.SERIAL,
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};