const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

  
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});


let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})


    myPromise.then((successMessage) => {

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});
console.log("From Callback " + successMessage)
  })

  myPromise.then((successMessage) => {

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
res.send(books[isbn])
 });
 console.log("From Callback " + successMessage)
})


   myPromise.then((successMessage) => {

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter((book) =>{return book.author === author});
  res.send(booksByAuthor);
});

console.log("From Callback " + successMessage)
})


myPromise.then((successMessage) => {

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter((book) =>{return book.title === title});
  res.send(booksByTitle);

});

console.log("From Callback " + successMessage)
})

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
 
  const isbn = req.params.isbn;
  book = books[isbn]
  res.send(book.reviews)
});

module.exports.general = public_users;