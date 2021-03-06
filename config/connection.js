/* Initialize connection to MySQL database using Sequelize */

// Import sequelize
const Sequelize = require('sequelize');

// Import dotenv to read .env file
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

module.exports = sequelize;
