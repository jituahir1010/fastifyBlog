const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, "Title length should be 10 char. minumam "],
  },
  desforSeo: String,
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },

  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  
});

module.exports = mongoose.model("Blog", blogSchema )