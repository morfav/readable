import { combineReducers } from 'redux';

import { ADD_POSTS, ADD_CATEGORY } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return [...state, ...action.posts];
    default:
      return state;
  }
}

function selectedCategories(state = new Set(), action) {
  switch (action.type) {
    case ADD_CATEGORY:
      if (state.has(action.category)) {
        return new Set([...state].filter(category => category !== action.category));
      } else {
        return new Set([...state, action.category]);
      }
      // return Object.assign({}, state, action.category);
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  selectedCategories,
});
