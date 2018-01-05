import { connect } from 'react-redux';

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
    state.posts.filter(post => selectedCategories.includes(post.category))
    : state.posts;
  posts.sort(state.postComparator);
  return {
    posts,
  };
}

export default connect(mapStateToProps)(Posts);
