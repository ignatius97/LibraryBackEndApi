const express = require('express');
const router = express.Router();
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
router.post("/AddAuthor", async (req, res) => {
    console.log(req);

    try {
        const data = req.body;
        const author = await AuthorModel.create(data);
        res.status(201).send({message : 'Record Saved',body:author})
       }catch(err){
         console.log(err);
       }
  
});

//.....................................................The Get Route.......................................
router.get('/AllAuthors', async(req , res)=>{
    try {
        const Authors = await AuthorModel.find();
        res.send(Authors);
      } catch (err) {
        console.log(err);
      }
    });


//.....................................................The Get by Id Route.......................................
router.post('/SingleAuthor', async(req , res)=>{
    try {
        const author = await AuthorModel.findOne({_id: req.body.id });
        if(author == null){
            res.send({message:"Author not found"});
        }
        else{
            res.send(author);
        }
        
      } catch (err) {
        console.log(err);
      }   
    });

//.....................................................The Update Author Route.......................................
router.put('/UpdateAuthor', async(req , res)=>{
    console.log(req.body)
    try {
        const UpdateAuthorName = await AuthorModel.updateOne(
            { _id: req.body.id },
            { $set: { name : req.body.name } }
         );
        
        res.send( {message:"Author Updated", body: UpdateAuthorName });

      } catch (err) {
        console.log(err);
      }   
    });


//.....................................................The Delete Routes.......................................
// author id
router.delete('/DelAuthor', async(req , res)=>{
    try {
        // get the author data in order to get the books list
        const author = await AuthorModel.findOne({_id: req.body.id });
        console.log(author);
        // delete all the books in the booksModel in this list
        if(author.books !== null){
            const Delbooks = await BookModel.deleteMany(
                {
                    _id: {
                      $in: author.books
                    }
                  }
            );
        }
        
        // delete the author
        const DelAuthor = await AuthorModel.deleteOne({_id: req.body.id });
  
         
        res.send({message:'Author deleted'});
      } catch (err) {
        console.log(err);
      }   
    });

  



module.exports = router;