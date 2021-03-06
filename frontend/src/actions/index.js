import uuidv4 from 'uuid/v4';

import {
  fetchPostById, fetchAllPosts, fetchCategories, fetchCommentsForPost, commentVoteApi,
  updateCommentApi, createCommentApi, deleteCommentApi, postVoteApi, createPostApi,
  updatePostApi, deletePostApi, fetchPostsForCategoryApi,
} from '../utils/api';

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
export const SET_CATEGORY_POSTS = 'SET_CATEGORY_POSTS';
export const START_POST_DETAIL_LOAD = 'START_POST_DETAIL_LOAD';
export const STOP_POST_DETAIL_LOAD = 'STOP_POST_DETAIL_LOAD';

export const suppressOnClick = (onClickEvent) => {
  if (onClickEvent) {
    onClickEvent.stopPropagation();
  }
};

export const addCategories = categories => ({
  type: ADD_CATEGORIES,
  categories,
});

export const getCategories = () => dispatch => (
  fetchCategories().then(({ categories }) => dispatch(addCategories(categories)))
);

export const postDetailsLoaded = () => ({
  type: STOP_POST_DETAIL_LOAD,
});

export const addPosts = posts => ({
  type: ADD_POSTS,
  posts,
});

export const postDetailsLoading = () => ({
  type: START_POST_DETAIL_LOAD,
});

export const getPosts = postIdUrl => (dispatch) => {
  if (postIdUrl) {
    dispatch(postDetailsLoading());
    fetchPostById(postIdUrl)
      // Only add the post if it is not an empty object
      .then(post => dispatch(postDetailsLoaded()) && post.id && dispatch(addPosts([post])));
  } else {
    fetchAllPosts().then(posts => dispatch(addPosts(posts)));
  }
};

export const addComments = comments => ({
  type: ADD_COMMENTS,
  comments,
});

export const getComments = postIdUrl => dispatch => (
  fetchCommentsForPost(postIdUrl).then(comments => dispatch(addComments(comments)))
);

export const vote = (type, actionObject, onClickEvent) => (dispatch) => {
  suppressOnClick(onClickEvent);
  if (actionObject.parentId) {
    commentVoteApi(actionObject.id, type === INCREMENT_COMMENT_VOTE ? 'upVote' : 'downVote')
      .then(() => dispatch(getComments(actionObject.parentId)));
  } else {
    postVoteApi(actionObject.id, type === INCREMENT_POST_VOTE ? 'upVote' : 'downVote')
      .then(() => dispatch(getPosts(actionObject.id)));
  }
};

export const updateComment = (comment, commentBody) => (dispatch) => {
  updateCommentApi(comment.id, commentBody)
    .then(() => dispatch(getComments(comment.parentId)));
};

export const createComment = (commentBody, parentId) => (dispatch) => {
  createCommentApi(uuidv4(), commentBody, parentId)
    .then(() => dispatch(getComments(parentId)))
    .then(() => dispatch(getPosts(parentId)));
};

export const deleteComment = (comment, onClickEvent) => (dispatch) => {
  suppressOnClick(onClickEvent);
  deleteCommentApi(comment.id)
    .then(() => dispatch(getComments(comment.parentId)))
    .then(() => dispatch(getPosts(comment.parentId)));
};

export function sortPosts(type, onClickEvent) {
  suppressOnClick(onClickEvent);
  return { type };
}


export const editNewPost = () => ({
  type: EDIT_NEW_POST,
});

export function editExistingPost(postId, onClickEvent) {
  suppressOnClick(onClickEvent);
  return {
    type: EDIT_EXISTING_POST,
    postId,
  };
}

export const stopEditingPost = () => ({
  type: STOP_EDITING_POST,
});

export const updatePost = (postId, postTitle, postBody, postCategory) => (dispatch) => {
  if (!postId) {
    const newPostId = uuidv4();
    createPostApi(newPostId, postTitle, postBody, postCategory)
      .then(() => dispatch(stopEditingPost()))
      .then(() => dispatch(getPosts(newPostId)));
  } else {
    updatePostApi(postId, postTitle, postBody)
      .then(() => dispatch(stopEditingPost()))
      .then(() => dispatch(getPosts(postId)));
  }
};

export const setPostsForCategory = (posts, category) => ({
  type: SET_CATEGORY_POSTS,
  posts,
  category,
});

export const getAllPostsForCategory = postCategory => (dispatch) => {
  fetchPostsForCategoryApi(postCategory)
    .then(posts => dispatch(setPostsForCategory(posts, postCategory)));
};

export const deletePost = (postId, postCategory) => (dispatch) => {
  deletePostApi(postId)
    .then(() => dispatch(getAllPostsForCategory(postCategory)));
};
