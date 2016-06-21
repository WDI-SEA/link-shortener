'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
       // models.url.belongsTo(models.links);
      }
    }
  });
  return link;
};
