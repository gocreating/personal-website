import { handleDbError } from '../decorators/handleError';
import filterAttribute from '../utils/filterAttribute';
import Post from '../models/Post';

export default {
  list(req, res) {
    Post.find({}, handleDbError(res)((posts) => {
      res.json({
        posts: posts,
        isError: false,
      });
    }));
  },

  create(req, res) {
    const post = Post({
      author: req.user._id,
      title: req.body.title,
      rawContent: req.body.rawContent,
    });

    post.save(handleDbError(res)((post) => {
      res.json({
        post: post,
        isError: false,
      });
    }));
  },

  read(req, res) {
    Post.findById(req.params.slug, handleDbError(res)((post) => {
      res.json({
        post: post,
        isError: false,
      });
    }));
  },

  update(req, res) {
    let post = filterAttribute(req.body, [
      'title',
      'rawContent',
    ]);
    Post.update({ _id: req.params.slug }, post, handleDbError(res)((raw) => {
      res.json({
        originAttributes: req.body,
        updatedAttributes: post,
        isError: false,
      });
    }));
  },

  remove(req, res) {
    Post.remove({_id: req.params.slug}, handleDbError(res)(() => {
      res.json({
        isError: false,
      });
    }));
  },
};
