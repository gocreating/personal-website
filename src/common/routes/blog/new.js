export default (store) => ({
  path: 'new',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/blog/NewPage').default);
    });
  },
  onEnter: require('../../utils/authRequired').default(store),
});
