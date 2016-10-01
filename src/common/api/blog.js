export default (apiEngine) => ({
  post: () => ({
    list: ({ page }) => apiEngine.get('/api/post', { params: { page } }),
    create: (post) => apiEngine.post('/api/post', { data: post }),
    read: (slug) => apiEngine.get(`/api/post/${slug}`),
    update: (slug, post) => apiEngine.put(`/api/post/${slug}`, { data: post }),
    remove: (slug) => apiEngine.del(`/api/post/${slug}`),
  }),
});
