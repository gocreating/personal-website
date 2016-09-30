import mongoose, { Schema } from 'mongoose';

function slugify(v) {
  return (v || '').replace(/\s+/g, '-');
}

function rawContentToAbstract(rawContent) {
  const MAX_ABSTRACT_LENGTH = 30;

  let { blocks } = rawContent;
  let blockLength = blocks.length;
  let abstract = '';

  if (blockLength > 0) {
    let abstractLength = 0;
    let abstractTexts = [];
    for (let i = 0; i < blockLength; i++) {
      let { text } = blocks[i];
      if (abstractLength + text.length < MAX_ABSTRACT_LENGTH) {
        abstractTexts.push(text);
        abstractLength += text.length;
      } else {
        break;
      }
    }

    if (abstractLength === 0) {
      abstract = blocks[0].text.substr(0, MAX_ABSTRACT_LENGTH);
    } else {
      abstract = abstractTexts.join('\n');
    }
  }
  return abstract;
}

let Post = new mongoose.Schema({
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
  abstract: String,
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
Post.path('title').set(function(value) {
  if (!this.slug) {
    this.slug = slugify(value);
    this._id = this.slug;
  }
  return value;
});

Post.path('rawContent').set(function(value) {
  this.abstract = rawContentToAbstract(value);
  return value;
});

export default mongoose.model('Post', Post);
