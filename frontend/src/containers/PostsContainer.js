import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getComparator, TIME } from '../utils/PostsComparatorHelper';
import { urlToCategoriesArray, getUrlCategories, getPostId } from '../utils/urlTools';

import Posts from '../components/Posts';
import { editNewPost, getPosts } from '../actions/';

function mapStateToProps(state, ownProps) {
  const selectedCategories = urlToCategoriesArray(getUrlCategories(ownProps.match));
  const postIdUrl = getPostId(ownProps.match);
  let posts;
  if (!postIdUrl) {
    posts = selectedCategories.length
      ? state.posts.posts.filter(post => selectedCategories.includes(post.category))
      : state.posts.posts;
    posts.sort(getComparator(
      state.posts.postsComparator,
      state.posts.postsComparator === TIME
        ? state.posts.timeAscending
        : state.posts.scoreAscending,
      posts,
    ));
  } else {
    posts = state.posts.posts.filter(post => post.id === postIdUrl);
  }
  return {
    posts: [...posts],
    postIdUrl,
    postDetailsLoading: state.posts.postDetailsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newPostClicked: () => dispatch(editNewPost()),
    getPost: postId => dispatch(getPosts(postId)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
