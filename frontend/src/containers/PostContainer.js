import { connect } from 'react-redux';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, sortPosts } from '../actions/';
import Post from '../components/Post';
import { arrayCategoriesToUrl } from '../utils/urlTools';


const mapStateToProps = (state, { post }) => {
  const { postsComparator, timeAscending, scoreAscending } = state.posts;
  const categoryUrl = arrayCategoriesToUrl(state.categories.selectedCategories, post.category);
  return ({
    post,
    getArrowIcon: type => getIcon(
      type,
      type === TIME ? timeAscending : scoreAscending,
      postsComparator,
    ),
    categoryUrl,
  });
};

const mapDispatchToProps = dispatch => ({
  vote: (type, post, e) => dispatch(vote(type, post, e)),
  sortPosts: (type, e) => dispatch(sortPosts(type, e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
