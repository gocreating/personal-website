export default (apiEngine) => ({
  post: () => ({
    list: () => apiEngine.get('/api/post'),
    create: (post) => apiEngine.post('/api/post', { data: post }),
    read: (slug) => apiEngine.get(`/api/post/${slug}`),
    update: (slug, post) => apiEngine.put(`/api/post/${slug}`, { data: post }),
    remove: (slug) => apiEngine.del(`/api/post/${slug}`),
  }),
});
