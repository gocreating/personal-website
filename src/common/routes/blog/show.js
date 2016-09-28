export default (store) => ({
  path: ':slug',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/blog/post/ShowPage').default);
    });
  },
});
