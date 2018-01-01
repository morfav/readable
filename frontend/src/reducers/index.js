import { combineReducers } from 'redux';
import selectedCategories from './selectedCategories';
import posts from './posts';

export default combineReducers({
  selectedCategories,
  posts,
});
