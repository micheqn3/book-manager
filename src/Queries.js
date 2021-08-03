/* Queries class contains helper query methods */

// Import book model
const Book = require('../models/Book');

class Queries {

    // Displays all books in DB with specified header
    async showBooks(operation) {
        switch (operation) {
            case 'view':
                console.log('\n= = = = View Books = = = =\n');
                break;
            case 'add':
                console.log('\n= = = = Add a Book = = = =\n');
                break;
            case 'edit': 
                console.log('\n= = = = Edit a Book = = = =\n');
                break;
            default:
                console.log('There was an error.');
        }
        const data = await Book.findAll();
        this.formatBookData(data);
    }

    // Formats book data
    formatBookData(data) { 
        if (data.length > 0) {
            data.forEach(val =>  console.log(`     [${val.id}] ${val.title}`));
        } else {
            console.log('\nThere are no books in the DB.');
        }
    }

    // Retrieves all book ID's and pushes into array
    async getAllBookIDs() {
        let array = [];
        const data = await Book.findAll();
        data.forEach(val => array.push(val.id.toString()));
        return array;
    }

    // Retrieves one book by its primary key
    async getOneBook(id) {
        const data = await Book.findByPk(id);
        return data;
    }

    // Edit a book 
    async editBook(id, array) {
        try {
            await Book.update(array, {
                where: {
                    id: id
                }
            })
            console.log(`\nBook [${id}] Saved`);
        } catch (error) {
            console.log('There was an error in updating.')
        }
    }

    // Removes empty/unedited key value pairs from object
    removeEmptyKeyVal = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((prop) => {
            if (obj[prop] !== '') {
                newObj[prop] = obj[prop]; 
            }
        })
        return newObj;
    }
}

module.exports = Queries;