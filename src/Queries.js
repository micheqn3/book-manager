/* Queries class contains helper query methods */

// Import book model
const Book = require('../models/Book');

class Queries {

    // Displays specified header for CRUD operation
    async showHeaderQ(operation) {
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
            case 'search': 
                console.log('\n= = = = Search = = = =\n');
                break;
            default:
                console.log('There was an error.');
        }
    }

    // Displays all books
    async displayBooksQ() {
        try {
            const data = await Book.findAll();
            this.formatBookDataQ(data);
        } catch (error) {
            console.log('There was an error retrieving all books.');
        }
    }

    // Formats book data
    formatBookDataQ(data) { 
        if (data.length > 0) {
            data.forEach(val =>  console.log(`     [${val.id}] ${val.title}`));
        } else {
            console.log('\nThere are no books in the DB.');
        }
    }

    // Formats book details for one book
    formatBookDetailsQ(val) {
        console.log(`     ID: ${val.id}`);
        console.log(`     Title: ${val.title}`);
        console.log(`     Author: ${val.author}`);
        console.log(`     Description: ${val.description}`);
    }

    // Retrieves all book IDs and pushes into array for validating user input
    async getAllBookIDsQ() {
        try {
            let array = [];
            const data = await Book.findAll();
            data.forEach(val => array.push(val.id.toString()));
            return array;
        } catch (error) {
            console.log('There was an error in retrieving all book IDs.');
        }
    }

    // Checks if the book ID the user input is in the DB
    isBookIDInDB(id, array) {
        if (!array.includes(id)) {
            return false;
        } else {
            return true;
        }
    }

    // Retrieves one book by its primary key
    async getOneBookQ(id) {
        try {
            const data = await Book.findByPk(id);
            return data;
        } catch (error) {
            console.log('There was an error in retrieving the book data.');
        }
    }

    // Retrieves all books in the DB and filter for search terms
    async searchQ(text) {
        try {
            let results = [];
            const data = await Book.findAll();
            for (let i = 0 ; i < data.length ; i++) {
                if (data[i].author.includes(text) || data[i].title.includes(text) || data[i].description.includes(text) ) {
                results.push(data[i]);
            }
        }
        return results;
        } catch (error) {
            console.log('There was an error retrieving all books.');
        }
    }

    // Edit a book 
    async editBookQ(id, array) {
        try {
            await Book.update(array, {
                where: {
                    id: id
                }
            })
            console.log(`\nBook [${id}] Saved`);
        } catch (error) {
            console.log('There was an error in updating.');
        }
    }

    // Add a book
    async addBookQ(obj) {
        try {
            const newBook = await Book.create(obj);
            console.log(`\nBook [${newBook.id}] Saved`);
        } catch (error) {
            console.log('There was an error in adding the book.');
        }
    }

    // Removes empty/unedited key value pairs from object to insert into book update
    removeEmptyKeyValQ = (obj) => {
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