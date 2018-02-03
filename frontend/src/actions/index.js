import uuidv4 from 'uuid/v4';

import { fetchPosts, fetchCategories, fetchCommentsForPost, commentVoteApi,
  updateCommentApi, createCommentApi, deleteCommentApi, postVoteApi,
  createPostApi, updatePostApi } from '../utils/api';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_POSTS = 'ADD_POSTS';
export const INCREMENT_POST_VOTE = 'INCREMENT_POST_VOTE';
export const DECREMENT_POST_VOTE = 'DECREMENT_POST_VOTE';
export const INCREMENT_COMMENT_VOTE = 'INCREMENT_COMMENT_VOTE';
export const DECREMENT_COMMENT_VOTE = 'DECREMENT_COMMENT_VOTE';
export const SORT_BY_TIME = 'SORT_BY_TIME';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const EDIT_NEW_POST = 'EDIT_NEW_POST';
export const EDIT_EXISTING_POST = 'EDIT_EXISTING_POST';
export const STOP_EDITING_POST = 'STOP_EDITING_POST';

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

export const vote = (type, actionObject, onClickEvent) => (dispatch) => {
  suppressOnClick(onClickEvent);
  if (actionObject.parentId) {
    commentVoteApi(actionObject.id, type === INCREMENT_COMMENT_VOTE ? 'upVote' : 'downVote').then(() => dispatch(getComments(actionObject.parentId)));
  } else {
    postVoteApi(actionObject.id, type === INCREMENT_POST_VOTE ? 'upVote' : 'downVote').then(() => dispatch(getPosts(actionObject.id)));
  }
};

export const updateComment = (comment, commentBody) => (dispatch) => {
  updateCommentApi(comment.id, commentBody).then(() => dispatch(getComments(comment.parentId)));
};

export const createComment = (commentBody, parentId) => (dispatch) => {
  createCommentApi(uuidv4(), commentBody, parentId).then(() => dispatch(getComments(parentId))).then(() => dispatch(getPosts(parentId)));
};

export const deleteComment = (comment, onClickEvent) => (dispatch) => {
  suppressOnClick(onClickEvent);
  deleteCommentApi(comment.id).then(() => dispatch(getComments(comment.parentId))).then(() => dispatch(getPosts(comment.parentId)));
};

export function sortPosts(type, onClickEvent) {
  suppressOnClick(onClickEvent);
  return { type };
}


export function editNewPost() {
  return {
    type: EDIT_NEW_POST,
  };
}

export function editExistingPost(postId, onClickEvent) {
  suppressOnClick(onClickEvent);
  return {
    type: EDIT_EXISTING_POST,
    postId,
  };
}

export function stopEditingPost() {
  return {
    type: STOP_EDITING_POST,
  };
}

export const updatePost = (postId, postTitle, postBody, postCategory) => (dispatch) => {
  if (!postId) {
    const newPostId = uuidv4();
    createPostApi(newPostId, postTitle, postBody, postCategory).then(() => dispatch(stopEditingPost())).then(() => dispatch(getPosts(newPostId)));
  } else {
    updatePostApi(postId, postTitle, postBody).then(() => dispatch(stopEditingPost())).then(() => dispatch(getPosts(postId)));
  }
};
