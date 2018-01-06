import { connect } from 'react-redux';
import getComparator, { TIME } from '../utils/postsComparator';

import Posts from '../components/Posts';

function mapStateToProps(state, ownProps) {
  let selectedCategories = [];
  // TODO this is bad
  if (ownProps.params && ownProps.params.category) {
    selectedCategories = [ownProps.params.category];
  } else {
    selectedCategories = [...state.categories.selectedCategories];
  }
  const posts = selectedCategories.length ?
    state.posts.posts.filter(post => selectedCategories.includes(post.category))
    : state.posts.posts;
  posts.sort(getComparator(state.posts.postsComparator, state.posts.postsComparator === TIME ? state.posts.timeAscending : state.posts.scoreAscending));
  return {
    posts: [...posts],
  };
}

export default connect(mapStateToProps)(Posts);
