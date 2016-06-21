'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    url: {
      type: DataTypes.TEXT,
      validate: {
        isURL: {
          require_protocol: true
        }
      }
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastClick: DataTypes.DATE
  },
   {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};
