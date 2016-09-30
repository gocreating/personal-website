import ssrFetchStateController from '../controllers/ssrFetchState';

export default ({ app }) => {
  app.use('/*', ssrFetchStateController.user, ssrFetchStateController.intl);
  app.get('/blog/post/:slug', ssrFetchStateController.post);
  app.get('/todo', ssrFetchStateController.todo);
};
