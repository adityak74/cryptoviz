'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserApiKeys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserApiKeys.init({
    key: DataTypes.STRING,
    expirationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserApiKeys',
  });
  return UserApiKeys;
};