'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    urlInput: DataTypes.STRING,
    hash: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};