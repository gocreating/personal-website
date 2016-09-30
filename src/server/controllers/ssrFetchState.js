import querystring from 'querystring';
import todoAPI from '../../common/api/todo';
import blogAPI from '../../common/api/blog';
import wrapTimeout from '../decorators/wrapTimeout';
import { loginUser } from '../../common/actions/userActions';
import { updateLocale } from '../../common/actions/intlActions';
import { setTodo } from '../../common/actions/todoActions';
import { setPost } from '../../common/actions/blogActions';

export default {
  user: (req, res, next) => {
    let { cookie } = req.store.getState();
    req.store.dispatch(loginUser({
      token: cookie.token,
      data: cookie.user,
    }));
    next();
  },
  intl: wrapTimeout(3000)((req, res, next) => {
    const cookieLocale = req.store.getState().cookie.locale;
    let lang;
    if (cookieLocale) {
      lang = cookieLocale;
    } else {
      lang = req.acceptsLanguages('en-us', 'zh-tw');
    }
    req.store
      .dispatch(updateLocale(lang))
      .then(() => {
        next();
      }, (err) => {
        throw err;
      });
  }),
  todo: wrapTimeout(3000)((req, res, next) => {
    todoAPI(req.store.getState().apiEngine)
      .list()
      .catch((err) => {
        throw err;
      })
      .then((json) => {
        req.store.dispatch(setTodo(json.todos));
        next();
      });
  }),
  post: wrapTimeout(3000)((req, res, next) => {
    blogAPI(req.store.getState().apiEngine)
      .post()
      .read(querystring.escape(req.params.slug))
      .catch((err) => {
        throw err;
      })
      .then((json) => {
        req.store.dispatch(setPost(json.post));
        next();
      });
  }),
};
