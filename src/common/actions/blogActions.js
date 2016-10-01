import actionTypes from '../constants/actionTypes';
import { setCookie } from './cookieActions';

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

export const setPage = (page) => {
  return {
    type: actionTypes.SET_PAGE,
    page,
  };
};

export const setColumn = (column) => {
  return setCookie('column', column);
};
