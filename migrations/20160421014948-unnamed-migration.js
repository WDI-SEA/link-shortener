'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
  'links',
  'count',
  Sequelize.INTEGER
)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('links', 'count')

  }
};
