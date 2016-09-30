import actionTypes from '../constants/actionTypes';

let initState = {
  isPostsFetched: false,
  posts: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS: {
      return {
        ...state,
        isPostsFetched: true,
        posts: [
          ...action.posts.map((post) => ({
            isFetched: false,
            rawContent: {
              blocks: [],
              entityMap: {},
            },
            ...post,
          })),
        ],
      };
    }
    case actionTypes.SET_POST: {
      let { posts } = state;
      let postIndex = -1;

      posts.forEach((post, index) => {
        if (post.slug === action.post.slug) {
          postIndex = index;
        }
      });

      action.post.isFetched = true;
      if (postIndex >= 0) {
        posts[postIndex] = action.post;
        return {
          ...state,
          posts: [
            ...posts,
          ],
        };
      }
      return {
        ...state,
        posts: [
          action.post,
        ],
      };
    }
    default: {
      return state;
    }
  }
};
