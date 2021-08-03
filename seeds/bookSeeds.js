/* Seeds for book table */
const Book = require('../models/Book');

const books = [
    {
        "title": "Paper Towns",
        "author": "John Green",
        "description": 'A coming of age story.'
    },
    {
        "title": "Eat A Peach",
        "author": "David Chang",
        "description": "Chef David Chang's memoir."
    },
    {
        "title": "Kitchen Confidential",
        "author": "Anthony Bourdain",
        "description": "A book about the long and perilous road Bourdain took to become a chef at a fancy restaurant in Manhattan."
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "The tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan."
    },
    {
        "title": "Eat Pray Love",
        "author": "Elizabeth Gilbert",
        "description": "Liz embarks on a quest of self-discovery that takes her to Italy, India and Bali."
    },
]


const seedBooks = () => Book.bulkCreate(books);
  
module.exports = seedBooks;