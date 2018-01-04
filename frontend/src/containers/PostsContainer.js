import { connect } from 'react-redux';

import Posts from '../components/Posts';

function mapStateToProps(state, ownProps) {
  let selectedCategories = [];
  if (ownProps.params && ownProps.params.category) {
    selectedCategories = [ownProps.params.category];
  } else {
    selectedCategories = [...state.categories.selectedCategories];
  }
  return {
    posts: selectedCategories.length ?
      state.posts.filter(post => selectedCategories.includes(post.category))
      : state.posts,
  };
}

export default connect(mapStateToProps)(Posts);
