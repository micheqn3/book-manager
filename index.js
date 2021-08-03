/* This file is responsible for controlling the overall flow of the application */

// Import inquirer, sequelize connection, book model, and inquirer prompts
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const Book = require('./models/Book');
const {menu, bookIDPrompt, editPrompt, addPrompt, viewDetailPrompt} = require('./src/inquirer');

// Import class to use query methods
const Queries = require('./src/Queries');
const db = new Queries;

// Starts the inquirer prompts
const startPrompts = async () => {
    try {
        const menuChoice = await inquirer.prompt(menu);
        userChoice(menuChoice.choice);
    } catch (error) {
        if (error.isTtyError) {
            console.log("The prompt couldn't be rendered in this current environment.");
        } else {
            console.log("Something else went wrong");
        }
    }
}

// Redirects the menu based on the user's input
const userChoice = (choice) => {
    switch (choice.trim()) {
        case '1) View all books':
            getAllBooks();
            break;
        case '2) Add a book': 
            addBook();
            break;
        case '3) Edit a book': 
            editBook()
            break;
        case '4) Search for a book':
            console.log('*Search for a book');
            break;
        case '5) Save and exit':
            console.log('\nLibrary saved.');
            process.exit();
            break;
        default: 
            console.log('There was an error.');
    }
}

// View all books and continues to ask the user to view details until they press enter
const getAllBooks = async () => {
    await db.showHeaderQ('view');
    await db.displayBooksQ();
    let data;

    do {
        // Retrieves current book IDs. If the user does not click enter, compare current book IDs with user input
        // If ID is valid, display book details
        data = await inquirer.prompt(viewDetailPrompt);
        const bookIDs = await db.getAllBookIDsQ();
        if (data.id === "") {
            startPrompts();
            return;
        }
        const isInDB = db.isBookIDInDB(data.id, bookIDs);
        if (!isInDB) {
            console.log('\nPlease enter a valid ID.');
        } else {
            // Make query here
            const book = await db.getOneBookQ(data.id);
            db.formatBookDetailsQ(book);
        }
    } while (data.id.length > 0);
    startPrompts();
}

// Add a book to the DB
const addBook = async () => {
    await db.showHeaderQ('add');
    const data = await inquirer.prompt(addPrompt);
    await db.addBookQ(data);
    startPrompts();
}

// Displays all books and prompts user to edit book. 
// Passes in array of current book IDs to validate input
const editBook = async () => {
    await db.showHeaderQ('edit');
    await db.displayBooksQ();
    const currentIDArray = await db.getAllBookIDsQ();
    const bookID = await inquirer.prompt(bookIDPrompt(currentIDArray));

    // If the user presses enter to exit, go back to menu
    if (!bookID.id) { 
        startPrompts();
    } else {
        // Retrieves book data and pass it to editPrompt to render inquirer prompt values to edit
        const bookData = await db.getOneBookQ(bookID.id);
        const updatedAns = await inquirer.prompt(editPrompt(bookData));

        // Pass only updated columns into update query
        const updatedVals = db.removeEmptyKeyValQ(updatedAns);
        await db.editBookQ(bookID.id, updatedVals);
        startPrompts();
    }
}

// Connects to the db and starts the prompts
const connection = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('DB connection is successful.\n');
        const numofBooks = await db.getAllBookIDsQ();
        console.log(`Loaded ${numofBooks.length} books into the library`);
        startPrompts();
    } catch (error) {
        console.log(`There was an issue with the DB connection: ${error}`);
    }
}

connection();


