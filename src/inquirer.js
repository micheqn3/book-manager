/* Inquirer prompts */

// Import dependencies
const inquirer = require('inquirer');

// Validation for if the user doesn't enter a value
const validateInput = (input) => { 
    if(!input) {
        return "Please enter a value.";
    }
    return true;
}

// Menu choices
const menu = [ 
    { 
        name: 'choice',
        message: '\n= = = = Book Manager = = = =\n',
        type: 'list',
        prefix: '',
        choices: [ 
            "     1) View all books",
            "     2) Add a book",
            "     3) Edit a book",
            "     4) Search for a book", 
            "     5) Save and exit", 
        ]   
    }
]

const addPrompt = [
    {
        name: 'title',
        message: '\nPlease enter the following information: \n      Title:',
        default: '',
        prefix: '',
        validate: validateInput
    },
    {
        name: 'author',
        message: '     Author:',
        default: '',
        prefix: '',
        validate: validateInput
    },
    {
        name: 'description',
        message: '     Description:',
        default: '',
        prefix: '',
        validate: validateInput
    }     
]

const viewAllPrompt = [
    {
        name: 'id',
        message: 'To view details enter the book ID, to return press <Enter>.',
        default: '',
        prefix: '',
    }     

]

// Takes in the book data from the user and returns a prompt with book values
const editPrompt = (data) => {
    return [
        {
            name: 'title',
            message: `\nInput the following information. To leave a field unchanged, hit <Enter> \n\n      Title [${data.title}]:`,
            default: '',
            prefix: '',
        },
        {
            name: 'author',
            message: `     Author: [${data.author}]:`,
            default: '',
            prefix: '',
        },
        {
            name: 'description',
            message: `     Description: [${data.description}]:`,
            default: '',
            prefix: '',
        },
    ]
}

// Takes in the current array of IDs in the DB
// Returns an inquirer prompt with validation for the ID and checks if the user pressed enter to return to menu
const bookIDPrompt = (array) => {
    const checkForValidID = (input) => {
        // Checks if the user pressed enter
        if (!input) {
            return true;
        } else if (!array.includes(input)) {
            return "Please enter a valid book ID.";

        }
        return true;
    }
    return [
        {
            name: 'id',
            message: '\nEnter the book ID of the book you want to edit; to return press <Enter>. \n\nBook ID:',
            type: 'input',
            prefix: '',
            validate: checkForValidID
        }
    ]
}


module.exports = {menu, addPrompt, bookIDPrompt, editPrompt, viewAllPrompt}
