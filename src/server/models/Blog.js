import mongoose, { Schema } from 'mongoose';

function slugify(v) {
  return (v || '').replace(/\s+/g, '-');
}

let Blog = new mongoose.Schema({
  _id: String,
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  slug: {
    type: String,
    unique: true,
  },
  title: String,
  // the draft-js contentState
  rawContent: Object,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  // to force mongoose to save empty `rawContent.entityMap`.
  // Otherwise, `convertFromRaw` will go wrong
  minimize: false,
});

// ref: <https://gist.github.com/aheckmann/3658511>
Blog.path('title').set(function(value) {
  this.slug = slugify(value);
  if (this.isNew) {
    this._id = this.slug;
  }
  return value;
});

export default mongoose.model('Blog', Blog);
