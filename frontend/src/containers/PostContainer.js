import { connect } from 'react-redux';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, categoryClicked, sortPosts } from '../actions/';
import Post from '../components/Post';

const mapStateToProps = (state, { post }) => {
  const { postsComparator, timeAscending, scoreAscending } = state.posts;
  return ({
    post,
    getArrowIcon: type => getIcon(
      type,
      type === TIME ? timeAscending : scoreAscending,
      postsComparator,
    ),
  });
};

const mapDispatchToProps = dispatch => ({
  categoryClicked: category => dispatch(categoryClicked(category)),
  vote: (type, post, e) => dispatch(vote(type, post, e)),
  sortPosts: (type, e) => dispatch(sortPosts(type, e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
