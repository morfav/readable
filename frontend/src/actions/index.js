export const ADD_POSTS = 'ADD_POSTS';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}
