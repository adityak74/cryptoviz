'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cacher = require('sequelize-redis-cache');
const redis = require('redis');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const {
  REDIS_HOST,
  REDIS_PORT,
  MYSQL_USER,
  SQL_HOST,
  SQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

let sequelize;
sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: SQL_HOST,
  port: SQL_PORT,
  dialect: 'mysql',
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// each request will live for 10 seconds in cache
const sequelizeCacher = cacher(sequelize, redisClient).ttl(10);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.cacher = sequelizeCacher;

module.exports = db;
