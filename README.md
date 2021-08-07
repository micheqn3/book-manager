[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Book Manager

This repository contains a content management system interface that maintains a database of books and utilizes Sequelize
in order to view and interact with data that is stored in the database. <br> <br>
This application is run through the command line and allows the user to:

  - View all books
  - Add a new book
  - Edit an existing book
  - Search for books using keywords

### Installation 

1. Make sure you have Node.js to run the application
2. Clone this repo
> HTTPS: `https://github.com/micheqn3/book-manager.git` <br>
> SSH: `git@github.com:micheqn3/book-manager.git`
3. Install the NPM packages
> npm install
4. Provide your MySQL credentials in an .env folder
> DB_NAME= <br>
> DB_USER= <br>
> DB_PASSWORD= <br>
5. Make sure your MySQL server is running and create the database in MySQL using the schema found in the db folder
6. Run the application in the command line 
> node index.js
7. To run the seed:
> npm run seed

### Technologies/Languages used: 

  - JavaScript
  - Node.js
  - Inquirer
  - MySQL Database
  - MySQL2
  - Sequelize
  - Dotenv

### Walkthrough Demo

https://user-images.githubusercontent.com/68047684/128582502-7e0f24de-1b49-4e95-9276-eb4c295890cb.mp4

### License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT 
