const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
// importing to the models
require('../Models/BookModel'); 
require('../Models/AuthorModel'); 
// Getting mongoose and passport to connect to the database and authenticate users
const mongoose = require('mongoose');

// Giving the models variable names to use
const BookModel = mongoose.model('BookModel')
const AuthorModel = mongoose.model('AuthorModel')

//.....................................................The Post Routes.......................................
//sending the new records when registering a manager   
router.post("/AddBook", async (req, res) => {

    try {
        const book = req.body;
        if (!ObjectId.isValid(book.author)) {
          throw new Error('author object id not passed');
        }
        const newBook = await BookModel.create(book);
        const AuthorBooks = await AuthorModel.updateOne(
            { _id: book.author },
            { $push: { books : newBook._id } }
         );
        res.status(201).send({message : 'Record Saved',body:newBook})
        // res.status(201).send({message : 'Record Saved',body:AuthorBooks})
      } catch (err) {
        console.log(err);
      }
  

});

//.....................................................The Get Route.......................................
router.get('/AllBooks', async(req , res)=>{
    try {
        const books = await BookModel.find().populate('author');
        res.send(books);
      } catch (err) {
        console.log(err);
      }   
    });

//.....................................................The Get by Id Route.......................................
router.post('/SingleBook', async(req , res)=>{
    try {
        const book = await BookModel.findOne({_id: req.body.id });
        if(book == null){
            res.send({message:"book not found"});
        }
        else{
            res.send(book);
        }
        
      } catch (err) {
        console.log(err);
      }   
    });

//.....................................................The Update book Routes.......................................
router.put('/UpdateBook', async(req , res)=>{
    // id
    // title
    // author id
    console.log(req.body);
    
    try {
        
        if(req.body.title !== undefined){
            console.log(req.body.title);
            const UpdateBookTitle = await BookModel.updateOne(
                { _id: req.body.id },
                { $set: { title : req.body.title } }
             );
            
            res.send( {message:"Book Updated" });
        }
        if(req.body.author !== undefined){
            console.log(req.body.author);
            // check if the d given is valid
            if (!ObjectId.isValid(req.body.author)) {
            throw new Error('author object id not passed');
            }
            // get the current author id
            const oldbookDetails = await BookModel.findOne({_id: req.body.id });
            // pop the book id from the current author's book list
            const DelAuthorBooks = await AuthorModel.updateOne(
                { _id: oldbookDetails.author },
                { $pull: { books : req.body.id } }
            );
            // add the book id to the new author's book list
            const AuthorBooks = await AuthorModel.updateOne(
                { _id: req.body.author },
                { $push: { books : req.body.id } }
             );
             // update the author id in the book's collection
             const UpdateAuthorId = await AuthorModel.updateOne(
                { _id: req.body.id },
                { $set: { author : req.body.author } }
             );
                      
            res.send( {message:"Book Updated"});
        }
        
        
      } catch (err) {
        console.log(err);
      }   
    });    


    
//.....................................................The Delete Route.......................................
router.delete('/DelBook', async(req , res)=>{
    try {
        const book = await BookModel.findOne({_id: req.body.id });
        console.log(book);
        const DelAuthorBooks = await AuthorModel.updateOne(
            { _id: book.author },
            { $pull: { books : book._id } }
         );
         const Delbooks = await BookModel.deleteOne({_id: req.body.id });
        res.send({message:'Book deleted'});
      } catch (err) {
        console.log(err);
      }   
    });



  



module.exports = router;