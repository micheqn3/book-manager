/* Inquirer prompts */

// Import dependencies
const inquirer = require('inquirer');

// Menu choices
const menu = [ 
    { 
        name: 'choice',
        message: '==== Book Manager ====\n',
        type: 'list',
        choices: [ 
            "1) View all books",
            "2) Add a book",
            "3) Edit a book",
            "4) Search for a book", 
            "5) Save and exit", 
        ]   
    }
]

module.exports = menu;
