'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        telephone: {
          type: Sequelize.BIGINT
        },
        addressId: {
          type: Sequelize.UUID,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'addresses',
            id: 'id'
          }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('Users')
  }
};