'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coins', {
      id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exchange: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base_unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Coins');
  }
};
