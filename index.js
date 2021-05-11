var express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

var app = express();

app.use(bodyParser.json())  
    
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())



const swaggerOptions = {
    definition: {
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
 *          parameters:
 *          - name : id
 *            description : the id of the book
 *            type : string
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
 *          parameters:
 *          - name : title
 *            description : title of the book
 *            type : string
 *          - name : author
 *            description : Id of the author of the book
 *            type : string
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
 *          parameters:
 *          - name : id
 *            description : id of the book
 *            type : string
 *          - name : title
 *            description : title of the book (optional)
 *            type : string
 *          - name : author
 *            description : Owner of the book (optional)
 *            type : string
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
 *          parameters:
 *          - name : id
 *            description : id of the book
 *            type : string
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
 *          parameters:
 *          - name : id
 *            description : the id of the Author
 *            type : string
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
 *          parameters:
 *          - name : name
 *            description : name of the author
 *            type : string
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
 *          parameters:
 *          - name : id
 *            description : id of the author
 *            type : string
 *          - name : name
 *            description : new name of the author
 *            type : string
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
 *          parameters:
 *          - name : id
 *            description : id of the author
 *            type : string
 *          responses:
 *              201:
 *                  description: Author Deleted
 * 
 */