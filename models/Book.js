/* Model for book table */

// Import sequelize dependencies and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Extending the sequelize model and defining the model attributes
class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'book',
  }
);

module.exports = Book;