import { combineReducers } from 'redux';
import cookie from './cookieReducer';
import apiEngine from './apiEngineReducer';
import todos from './todoReducer';
import blog from './blogReducer';
import form from './formReducer';
import intl from './intlReducer';

const rootReducer = combineReducers({
  cookie,
  apiEngine,
  todos,
  blog,
  form,
  intl,
});

export default rootReducer;
