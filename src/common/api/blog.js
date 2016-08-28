export default (apiEngine) => ({
  list: () => apiEngine.get('/api/blog'),
  create: (blog) => apiEngine.post('/api/blog', { data: blog }),
  read: (slug) => apiEngine.get(`/api/blog/${slug}`),
  update: (slug, blog) => apiEngine.put(`/api/blog/${slug}`, { data: blog }),
  remove: (slug) => apiEngine.del(`/api/blog/${slug}`),
});
