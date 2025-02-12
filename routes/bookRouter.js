const express = require('express');	
const path = require('path');
const router = express.Router();
const reviewRouter = require('./reviewRouter.js');
const jwt = require('jsonwebtoken');
const bookList = [
  {id: 0, title: "book1", author: "bobo", ISBN: "0"},
  {id: 1, title: "book2", author: "naro", ISBN: "1"}
];
const key = "secret";

// authorization
router.use('/', (req, res, next) => {
    // authorization check
    if (!req.session.authorization) {
      return res.sendStatus(401);
    }
    const accessToken = req.session.authorization;
    jwt.verify(accessToken, key, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
});

//routes
router.get('/', (req, res) => {
    const options = {
      root: path.join(__dirname,'..', 'public')
    };
    res.sendFile('book.html', options);
});

router.get('/search', (req, res) => {
  res.send(bookList);
});

router.post('/search', (req, res) => {
  const filteredBooks = filterBooks(bookList, req.query); 
  console.log(filteredBooks);
  res.send(filteredBooks);
});

router.use('/review', reviewRouter);

module.exports = router;

function filterBooks(books, filters) {
  return books.filter(book => {
    for (const [key, value] of Object.entries(filters)) {
      if (value != "" && book[key] !== value) { 
        return false; // If any filter doesn't match, exclude the book
      }
    }
    return true; // If all filters match, include the book
  });
}