/* Queries class contains helper query methods */

// Import book model
const Book = require('../models/Book');

class Queries {

    // Displays all books in DB with specified header
    async showBooksQ(operation) {
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

    // Retrieves all book ID's and pushes into array
    async getAllBookIDsQ() {
        try {
            let array = [];
            const data = await Book.findAll();
            data.forEach(val => array.push(val.id.toString()));
            return array;

        } catch (error) {
            console.log('There was an error in retrieving all book IDs');
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

    // Removes empty/unedited key value pairs from object
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