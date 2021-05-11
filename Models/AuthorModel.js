const mongoose = require('mongoose');

const authorModel = mongoose.Schema({
  
  
  name: { 
  	type: String, 
    required: '{PATH} is required!'

  },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BookModel' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('AuthorModel', authorModel);