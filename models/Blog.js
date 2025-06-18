const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // optional image URL or path
  category: { type: String },
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  author: {
    type: String, // changed from ObjectId to simple String
    required: true,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
