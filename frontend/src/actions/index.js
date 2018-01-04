export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_POSTS = 'ADD_POSTS';
export const CATEGORY_CLICKED = 'CATEGORY_CLICKED';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function categoryClicked(category) {
  return {
    type: CATEGORY_CLICKED,
    category,
  };
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}
