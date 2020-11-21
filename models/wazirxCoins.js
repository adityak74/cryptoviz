const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WazirXCoins extends Sequelize.Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	WazirXCoins.init(
		{
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
		},
		{
			sequelize,
			modelName: 'WazirXCoins',
		}
	)
	return WazirXCoins
};
