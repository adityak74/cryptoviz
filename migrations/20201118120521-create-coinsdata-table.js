'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CoinsData', {
      id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
      coinID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Coins', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      low: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      high: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      last: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      open: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      volume: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      sell: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      buy: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      tickerType: {
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
     await queryInterface.dropTable('CoinsData');
  }
};
