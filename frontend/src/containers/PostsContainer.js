import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getComparator, TIME } from '../utils/PostsComparatorHelper';
import { urlToCategoriesArray, getUrlCategories } from '../utils/urlTools';

import Posts from '../components/Posts';
import { editNewPost } from '../actions/index';

function mapStateToProps(state, ownProps) {
  const selectedCategories = urlToCategoriesArray(getUrlCategories(ownProps.match));
  const posts = selectedCategories.length ?
    state.posts.posts.filter(post => selectedCategories.includes(post.category))
    : state.posts.posts;
  posts.sort(getComparator(state.posts.postsComparator, state.posts.postsComparator === TIME ? state.posts.timeAscending : state.posts.scoreAscending, posts));
  return {
    posts: [...posts],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newPostClicked: () => dispatch(editNewPost()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
