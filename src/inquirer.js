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

// Capitalizes every first letter in each word in a string + removes whitespace for consistency 
// when adding to DB
const capEachWord = (str) => { 
    return str.trim().split(" ").map(word => {
      return word.substring(0,1).toUpperCase() + word.substring(1)
    }).join(" ");
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

// Add book prompt
const addPrompt = [
    {
        name: 'title',
        message: '\nPlease enter the following information: \n      Title:',
        default: '',
        prefix: '',
        validate: validateInput,
        filter: capEachWord
    },
    {
        name: 'author',
        message: '     Author:',
        default: '',
        prefix: '',
        validate: validateInput,
        filter: capEachWord
    },
    {
        name: 'description',
        message: '     Description:',
        default: '',
        prefix: '',
        validate: validateInput,
        filter: capEachWord
    }     
]

// View book details prompt
const viewDetailPrompt = [
    {
        name: 'id',
        message: '\nTo view details enter the book ID, to return press <Enter>.\n',
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

// Edit book prompt
const bookIDPrompt = [
    {
        name: 'id',
        message: '\nEnter the book ID of the book you want to edit; to return press <Enter>. \n\nBook ID:',
        type: 'input',
        prefix: '',
    }
]

// Search keyword prompt
const keywordPrompt = [
    {
        name: 'search',
        message: 'Type in one or more keywords to search for \n\n     Search:',
        type: 'input',
        prefix: '',
        filter: capEachWord
    }
]

module.exports = {menu, addPrompt, bookIDPrompt, editPrompt, viewDetailPrompt, keywordPrompt}
