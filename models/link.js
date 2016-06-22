'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    url: {
      type: DataTypes.TEXT,
      validate: {
        isURL: { require_protocol: true }
      }
    },
    clickCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    classMethods: {
        // associations can be defined here
      associate: function(models) {
      }
    }
  });
  return link;
};
