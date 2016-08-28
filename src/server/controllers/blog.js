import { handleDbError } from '../decorators/handleError';
import filterAttribute from '../utils/filterAttribute';
import Blog from '../models/Blog';

export default {
  list(req, res) {
    Blog.find({}, handleDbError(res)((blogs) => {
      res.json({
        blogs: blogs,
        isError: false,
      });
    }));
  },

  create(req, res) {
    const blog = Blog({
      author: req.user._id,
      title: req.body.title,
      rawContent: req.body.rawContent,
    });

    blog.save(handleDbError(res)((blog) => {
      res.json({
        blog: blog,
        isError: false,
      });
    }));
  },

  read(req, res) {
    Blog.findById(req.params.slug, handleDbError(res)((blog) => {
      res.json({
        blog: blog,
        isError: false,
      });
    }));
  },

  update(req, res) {
    let blog = filterAttribute(req.body, [
      'title',
      'rawContent',
    ]);
    Blog.update({ _id: req.params.slug }, blog, handleDbError(res)((raw) => {
      res.json({
        originAttributes: req.body,
        updatedAttributes: blog,
        isError: false,
      });
    }));
  },

  remove(req, res) {
    Blog.remove({_id: req.params.slug}, handleDbError(res)(() => {
      res.json({
        isError: false,
      });
    }));
  },
};
