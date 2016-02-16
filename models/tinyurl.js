'use strict';
module.exports = function(sequelize, DataTypes) {
  var tinyurl = sequelize.define('tinyurl', {
    url: DataTypes.STRING,
    hash: DataTypes.STRING,
    clicks: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tinyurl;
};