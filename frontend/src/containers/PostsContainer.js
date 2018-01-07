import { connect } from 'react-redux';
import getComparator, { TIME } from '../utils/postsComparator';

import Posts from '../components/Posts';

function mapStateToProps(state, ownProps) {
  const selectedCategories = [...state.categories.selectedCategories];
  const posts = selectedCategories.length ?
    state.posts.posts.filter(post => selectedCategories.includes(post.category))
    : state.posts.posts;
  // Unfortunately the sort is not stable on Chrome
  posts.sort(getComparator(state.posts.postsComparator, state.posts.postsComparator === TIME ? state.posts.timeAscending : state.posts.scoreAscending));
  return {
    posts: [...posts],
  };
}

export default connect(mapStateToProps)(Posts);
