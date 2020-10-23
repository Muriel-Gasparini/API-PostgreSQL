'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      street: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('addresses')
  }
};