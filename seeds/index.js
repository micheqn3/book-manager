// Bulk seeds the table with book data

const sequelize = require('../config/connection');
const seedBooks = require('./bookSeeds');

const seedDB = async () => {
    await sequelize.sync({ force: true });
    await seedBooks();
    process.exit(0);
};
  
seedDB(); 