/* This file is responsible for controlling the overall flow of the application */

// Import inquirer, sequelize connection, book model, and inquirer prompts
const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const Book = require('./models/Book');
const {menu, bookIDPrompt, editPrompt, addPrompt, viewDetailPrompt, keywordPrompt, searchIDPrompt} = require('./src/inquirer');

// Import class to use query methods
const Queries = require('./src/Queries');
const db = new Queries;

// Connects to the db 
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
        case '1':
            getAllBooks();
            break;
        case '2': 
            addBook();
            break;
        case '3': 
            editBook();
            break;
        case '4':
            searchBook();
            break;
        case '5':
            console.log('\nLibrary saved.');
            process.exit();
            break;
        default: 
            console.log('\nPlease choose 1-5.');
            startPrompts();
    }
}

// View all books and continues to ask the user to view details until they press enter
const getAllBooks = async () => {
    const numofBooks = await db.getAllBookIDsQ();
    if (numofBooks.length === 0 ) {
        console.log('\nThere are no books in the DB.');
        startPrompts();
        return;
    }
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
            // Retrieve single book data and display to user
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

// Search for keywords
const searchBook = async () => {
    await db.showHeaderQ('search');
    const data = await inquirer.prompt(keywordPrompt);
    const results = await db.searchQ(data.search);

    if (!results.length > 0) {
        console.log('\nThere were no books that match your search.');
        startPrompts();
        return;
    } 
    let bookID;
    console.log('\nThe following books matched your query. Enter the book ID to see more details, or <Enter> to return.\n')
    db.formatBookDataQ(results);
    do {
        // Allow the user to keep entering book IDs to view details. Take them back to menu with enter press
        // If user input ID is valid, display book data
        bookID = await inquirer.prompt(searchIDPrompt);
        const allBookIDs = await db.getAllBookIDsQ();
        if (bookID.id === "") {
            startPrompts();
            return;
        } 
        const isInDB = db.isBookIDInDB(bookID.id, allBookIDs);
        if (!isInDB) {
            console.log('\nPlease enter a valid ID.');
        } else {
            // Retrieve single book data and display to user
            const book = await db.getOneBookQ(bookID.id);
            db.formatBookDetailsQ(book);
        }
    } while (bookID.id.length > 0);
}

// Displays all books and prompts user to edit book until they press enter
const editBook = async () => {
    await db.showHeaderQ('edit');
    await db.displayBooksQ();
    let data;
    do {
        // Retrieves current book IDs. If the user does not click enter, compare current book IDs with user input
        // If ID is valid, display book details
        data = await inquirer.prompt(bookIDPrompt);
        const currentIDArray = await db.getAllBookIDsQ();
        if (data.id === "") {
            startPrompts();
            return;
        }
        const isInDB = db.isBookIDInDB(data.id, currentIDArray);
        if (!isInDB) {
            console.log('\nPlease enter a valid ID.');
        } else {
            // Retrieves book data and pass it to editPrompt to render inquirer prompt values to edit
            const bookData = await db.getOneBookQ(data.id);
            const updatedAns = await inquirer.prompt(editPrompt(bookData));

            // Pass only updated columns into update query
            const updatedVals = db.removeEmptyKeyValQ(updatedAns);
            await db.editBookQ(data.id, updatedVals);
        }
    } while (data.id.length > 0);
    startPrompts();
}

connection();


