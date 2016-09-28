export default (store) => ({
  path: 'blog/post',
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./list').default(store));
    });
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./new').default(store),
        require('./show').default(store),
        require('./edit').default(store),
      ]);
    });
  },
});
