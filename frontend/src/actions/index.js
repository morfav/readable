export const ADD_POSTS = 'ADD_POSTS';

export default function addPosts( posts ) {
  return {
    type: ADD_POSTS,
    posts,
  };
}
