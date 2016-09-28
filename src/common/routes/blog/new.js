export default (store) => ({
  path: 'new',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/blog/post/NewPage').default);
    });
  },
  onEnter: require('../../utils/authRequired').default(store),
});
