export const ADD_POSTS = 'ADD_POSTS';
export const CATEGORY_CLICKED = 'CATEGORY_CLICKED';

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
