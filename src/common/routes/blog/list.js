export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/blog/post/ListPage').default);
    });
  },
});
