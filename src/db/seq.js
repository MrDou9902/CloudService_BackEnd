const { Sequelize } = require('sequelize');

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DIALECT,
  DATABASE_TIMEZONE,
} = require('../config/config.default');

const seq = new Sequelize('mrdou_db', 'doudou', 'Dou666666', {
  host: '120.79.48.133',
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
});

seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = seq;
