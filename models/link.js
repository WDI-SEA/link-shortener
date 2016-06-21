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
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNULL: false
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};
