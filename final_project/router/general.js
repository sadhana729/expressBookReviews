const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password=req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({
        username:username,
        password:password
      });

      return res.status(200).json({
        message:"User successfully registered.Now you can login"
      });

    }

    return res.status(404).json({
      message:"User already exists!"
    });
  }

  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  const filteredBooks=Object.keys(books).filter(key=>books[key].author===author)
  .reduce((obj,key)=>{
    obj[key]=books[key];
    return obj;
  },{});
  return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const author=req.params.title;
  const filteredBooks=Object.keys(books).filter(key=>books[key].title===title)
  .reduce((obj,key)=>{
    obj[key]=books[key];
    return obj;
  },{});
  return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

// public_users.get('/async/books', async (req, res) => {

//     try {

//         const response = await axios.get(
//             'http://localhost:5000/'
//         );

//         return res.status(200).json(response.data);

//     } catch(error) {

//         return res.status(500).json({
//             message: error.message
//         });

//     }

// });

public_users.get('/promise/books', (req, res) => {

    axios.get('http://localhost:5000/')
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message
            });
        });

});

public_users.get('/async/isbn/:isbn', async (req, res) => {

    try {

        const isbn = req.params.isbn;

        const response = await axios.get(
            `http://localhost:5000/isbn/${isbn}`
        );

        return res.status(200).json(response.data);

    } catch(error) {

        return res.status(500).json({
            message: error.message
        });

    }

});

public_users.get('/async/author/:author', async (req, res) => {

    try {

        const author = req.params.author;

        const response = await axios.get(
            `http://localhost:5000/author/${author}`
        );

        return res.status(200).json(response.data);

    } catch(error) {

        return res.status(500).json({
            message: error.message
        });

    }

});

public_users.get('/async/title/:title', async (req, res) => {

    try {

        const title = req.params.title;

        const response = await axios.get(
            `http://localhost:5000/title/${title}`
        );

        return res.status(200).json(response.data);

    } catch(error) {

        return res.status(500).json({
            message: error.message
        });

    }

});

module.exports.general = public_users;
