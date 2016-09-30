import actionTypes from '../constants/actionTypes';

export const setPosts = (posts) => {
  return {
    type: actionTypes.SET_POSTS,
    posts,
  };
};

export const setPost = (post) => {
  return {
    type: actionTypes.SET_POST,
    post,
  };
};
