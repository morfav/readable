import { fetchPosts, fetchCategories, fetchCommentsForPost } from '../utils/api';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_POSTS = 'ADD_POSTS';
export const INCREMENT_VOTE = 'INCREMENT_VOTE';
export const DECREMENT_VOTE = 'DECREMENT_VOTE';
export const SORT_BY_TIME = 'SORT_BY_TIME';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';

export const suppressOnClick = (onClickEvent) => {
  if (onClickEvent) {
    onClickEvent.stopPropagation();
  }
};

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export const getCategories = () => dispatch => (
  fetchCategories().then(({ categories }) => dispatch(addCategories(categories)))
);


export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export const getPosts = postIdUrl => dispatch => (
  fetchPosts(postIdUrl).then(posts => dispatch(addPosts(postIdUrl ? [posts] : posts)))
);

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export const getComments = postIdUrl => dispatch => (
  fetchCommentsForPost(postIdUrl).then(comments => dispatch(addComments(comments)))
);

export function vote(type, post, onClickEvent) {
  suppressOnClick(onClickEvent);
  return {
    type,
    post,
  };
}

export function sortPosts(type, onClickEvent) {
  suppressOnClick(onClickEvent);
  return { type };
}
