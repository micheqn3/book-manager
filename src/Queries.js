/* Queries class contains helper query methods */

// Import book model
const Book = require('../models/Book');

class Queries {

    // Displays all books in DB with specified header
    async showBooks(operation) {
        const data = await Book.findAll();
        switch (operation) {
            case 'view':
                console.log('\n=== View Books ===\n');
                break;
            case 'add':
                console.log('\n=== Add a Book ===\n');
                break;
            case 'edit': 
                console.log('\n=== Edit a Book ===\n');
                break;
            default:
                console.log('There was an error.');
        }
        this.formatBookData(data);
    }
    // Formats book data
    formatBookData(data) { 
        data.forEach((val) => {
            console.log(`[${val.id}] ${val.title}`);
        })
    }
}

module.exports = Queries;