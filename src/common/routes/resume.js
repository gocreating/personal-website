export default (store) => ({
  path: 'resume',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/pages/ResumePage').default);
    });
  },
});
