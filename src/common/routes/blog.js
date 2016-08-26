export default (store) => ({
  path: 'blog',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/pages/blog/ListPage').default);
    });
  },
});
