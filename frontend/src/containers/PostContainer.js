import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, sortPosts } from '../actions/';
import Post from '../components/Post';
import { categoriesToUrl, getUrlCategories } from '../utils/urlTools';


const mapStateToProps = (state, { post, match }) => {
  const { postsComparator, timeAscending, scoreAscending } = state.posts;
  const categoryUrl = categoriesToUrl(getUrlCategories(match))(post.category);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
