/* Seeds for book table */
const Book = require('../models/Book');

const books = [
    {
        "title": "Paper Towns",
        "author": "John Green",
        "description": 'A Coming Of Age Story.'
    },
    {
        "title": "Eat A Peach",
        "author": "David Chang",
        "description": "Chef David Chang's Memoir."
    },
    {
        "title": "Kitchen Confidential",
        "author": "Anthony Bourdain",
        "description": "A Book About The Long And Perilous Road Bourdain Took To Become A Chef At A Fancy Restaurant In Manhattan."
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "The Tragic Story Of Jay Gatsby, A Self-made Millionaire, And His Pursuit Of Daisy Buchanan."
    },
    {
        "title": "Eat Pray Love",
        "author": "Elizabeth Gilbert",
        "description": "Liz Embarks On A Quest Of Self-discovery That Takes Her To Italy, India And Bali."
    },
]


const seedBooks = () => Book.bulkCreate(books);
  
module.exports = seedBooks;