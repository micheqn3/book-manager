/* This file is responsible for controlling the overall flow of the application */

// Import inquirer, sequelize connection, book model, and inquirer prompts
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const Book = require('./models/Book');
const {menu, bookIDPrompt, editPrompt} = require('./src/inquirer');

// Import class to use query methods
const Queries = require('./src/Queries');
const db = new Queries;

const startPrompts = () => {
    inquirer.prompt(menu).then(answers => {
        userChoice(answers.choice);
    }).catch(error => {
        if (error.isTtyError) {
            console.log("The prompt couldn't be rendered in this current environment.");
        } else {
            console.log("Something else went wrong");
        }
    })
}

// Redirects the menu based on the user's input
const userChoice = (choice) => {
    switch (choice.trim()) {
        case '1) View all books':
            getAllBooks();
            break;
        case '2) Add a book': 
            console.log('*Add a book');
            break;
        case '3) Edit a book': 
            editBook()
            break;
        case '4) Search for a book':
            console.log('*Search for a book');
            break;
        case '5) Save and exit':
            console.log('*Save and exit');
            break;
        default: 
            console.log('There was an error.');
    }
}

const getAllBooks = async () => {
    await db.showBooks('view');
    startPrompts();
}

const editBook = async () => {
    await db.showBooks('edit');
    let currentIDArray = await db.getAllBookIDs();
    inquirer.prompt(bookIDPrompt(currentIDArray)).then(answers => {
        if (!answers.id) {
            startPrompts();
        } else {
            // Get answers.id book data
            inquirer.prompt(editPrompt).then(answers => {
                console.log(answers.title)
                console.log(answers.author)
                console.log(answers.description)
            })
        }
    })
}

// Connects to the db and starts the prompts
sequelize.sync({ force: false }).then(() => {
    console.log('DB connection is successful.\n');
    startPrompts();
}, (error) => {
    console.log(`There was an issue with the DB connection: ${error}`);
});
