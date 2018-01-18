import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, sortPosts, suppressOnClick } from '../actions/';
import Post from '../components/Post';
import { categoriesToUrl, getUrlCategories, getPostId } from '../utils/urlTools';

const onCardClick = (e, history, postIdUrl, category, id) => {
  suppressOnClick(e);
  if (!postIdUrl) {
    history.push(`/${category}/${id}`);
  } else {
    history.push(`/${category}`);
  }
};

const getTimeLabel = (post, postIdUrl) => (
  postIdUrl ? new Date(post.timestamp).toDateString() : new Date(post.timestamp).toDateString()
);

const mapStateToProps = (state, { post, match, history }) => {
  if (post) {
    const { postsComparator, timeAscending, scoreAscending } = state.posts;
    const postIdUrl = getPostId(match);
    const categoryUrl = categoriesToUrl(getUrlCategories(match))(post.category);
    const postTime = getTimeLabel(post, postIdUrl);
    return ({
      post,
      getArrowIcon: type => getIcon(
        type,
        type === TIME ? timeAscending : scoreAscending,
        postsComparator,
        postIdUrl,
      ),
      postIdUrl,
      categoryUrl,
      postTime,
      onCardClick: e => onCardClick(e, history, postIdUrl, post.category, post.id),
    });
  }
  return ({
    loading: true,
  });
};

const mapDispatchToProps = dispatch => ({
  vote: (type, post, e) => dispatch(vote(type, post, e)),
  sortPosts: (type, e) => dispatch(sortPosts(type, e)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
