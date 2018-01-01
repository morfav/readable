import { connect } from 'react-redux';

import Posts from '../components/Posts';

const mapStateToProps = state => ({
  posts: state.posts.filter(post => (state.selectedCategories.size ?
    state.selectedCategories.has(post.category) : state.posts)),
});

export default connect(mapStateToProps)(Posts);
