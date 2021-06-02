const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoinsData extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	CoinsData.init(
		{
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
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      high: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      last: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      open: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      volume: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      sell: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      buy: {
        type: Sequelize.INTEGER,
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
		},
		{
			sequelize,
			modelName: 'CoinsData',
		}
	);
	return CoinsData
};
