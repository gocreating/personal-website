export default (store) => ({
  path: ':slug/edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../components/pages/blog/EditPage').default);
    });
  },
  onEnter: require('../../utils/authRequired').default(store),
});
