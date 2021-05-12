var express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

var app = express();

app.use(express.json()) 

app.use(express.raw())

app.use(express.text({ type: 'text/html' }))
    
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())



const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API',
        version: '1.0.0',
      },
    },
    apis: ['index.js','./Routes/AuthorRoute.js','./Routes/BookRoute.js'], // files containing annotations as above
  };

const swaggerDocs = swaggerJsdoc(swaggerOptions);




const AuthorRoute = require('./Routes/AuthorRoute')
const BookRoute = require('./Routes/BookRoute')

const AuthorModel = require('./Models/AuthorModel');
const BookModel = require('./Models/BookModel');

const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });

    

    app.use('/Authors',AuthorRoute);

    app.use('/Books',BookRoute);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    
    app.get('*',(req , res)=>{
        res.render("error_page")
    })

    port = process.env.PORT || "4001"

app.listen( port , function () {
  console.log('Example app listening on port 4001! or ' + port);
});




/**
 * @openapi
 * /Books/AllBooks:
 *      get:
 *          description: Get all books
 *          responses:
 *              200:
 *                  description: success
 *                  schema:
 *                       type : array
 *                       items:
 *                           properties:
 *                               _id:
 *                                   type: string
 *                               title:
 *                                   type : string
 *                               author:
 *                                   type : string
 *                               createdAt:
 *                                   type : Date
 *                               UpdatedAt:
 *                                   type : Date
 * 
 */

/**
 * @openapi
 * /Books/SingleBook:
 *      post:
 *          description: Get single book by id
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the Book
 *          responses:
 *              200:
 *                  description: success
 *                  schema:
 *                       type : array
 *                       items:
 *                           properties:
 *                               _id:
 *                                   type: string
 *                               title:
 *                                   type : string
 *                               author:
 *                                   type : string
 *                               createdAt:
 *                                   type : Date
 *                               UpdatedAt:
 *                                   type : Date
 * 
 */

/**
 * @openapi
 * /Books/AddBook:
 *      post:
 *          description: Create a book
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - title
 *                     - author
 *                    properties:
 *                      title:
 *                        type: string
 *                        description: Title of the Book
 *                      author:
 *                        type: string
 *                        description: Id of the author of the book
 *          responses:
 *              201:
 *                  description: Book Created
 * 
 */

/**
 * @openapi
 * /Books/UpdateBook:
 *      put:
 *          description: Update a book
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the book
 *                      title:
 *                        type: string
 *                        description: title of the book (optional)
 *                      author:
 *                        type: string
 *                        description: Owner of the book (optional)
 *          responses:
 *              201:
 *                  description: Book Updated
 * 
 */

/**
 * @openapi
 * /Books/DelBook:
 *      delete:
 *          description: delete a book
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the Book
 *          responses:
 *              201:
 *                  description: Book Deleted
 * 
 */






/**
 * @openapi
 * /Authors/AllAuthors:
 *      get:
 *          description: Get all Authors
 *          responses:
 *              200:
 *                  description: success
 *                  schema:
 *                       type : array
 *                       items:
 *                           properties:
 *                               _id:
 *                                   type: string
 *                               name:
 *                                   type : string
 *                               Books:
 *                                   type : array
 *                                   items:
 *                                      properties:
 *                                          _id:
 *                                              type : string
 *                               createdAt:
 *                                   type : date
 *                               UpdatedAt:
 *                                   type : date
 * 
 */

/**
 * @openapi
 * /Authors/SingleAuthor:
 *      post:
 *          description: Get single Author by id
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the author
 *          responses:
 *              200:
 *                  description: success
 *                  schema:
 *                       items:
 *                           properties:
 *                               _id:
 *                                   type: string
 *                               name:
 *                                   type : string
 *                               Books:
 *                                   type : array
 *                                   items:
 *                                      properties:
 *                                          _id:
 *                                              type : string
 *                               createdAt:
 *                                   type : date
 *                               UpdatedAt:
 *                                   type : date
 * 
 */

/**
 * @openapi
 * /Authors/AddAuthor:
 *      post:
 *          description: Create a book
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - name
 *                    properties:
 *                      name:
 *                        type: string
 *                        description: the author name
 *          responses:
 *              201:
 *                  description: Author Created
 * 
 */

/**
 * @openapi
 * /Authors/UpdateAuthor:
 *      put:
 *          description: Update the author
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                     - name
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the author
 *                      name:
 *                        type: string
 *                        description: new name of the author
 *          responses:
 *              201:
 *                  description: Author Updated
 * 
 */

/**
 * @openapi
 * /Authors/DelAuthor:
 *      delete:
 *          description: delete an author. deletes all there books too
 *          requestBody:
 *              description: user info to be filled
 *              content:
 *                application/x-www-form-urlencoded:
 *                  schema:
 *                    type: object
 *                    required:
 *                     - id
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: id of the author
 *          responses:
 *              201:
 *                  description: Author Deleted
 * 
 */