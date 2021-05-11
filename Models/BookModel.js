const mongoose = require('mongoose');

const bookModel = mongoose.Schema({
 
  title: {
  	type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthorModel'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BookModel', bookModel);
