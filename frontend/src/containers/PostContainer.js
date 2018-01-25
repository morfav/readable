import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, sortPosts, addPosts, addComments, suppressOnClick } from '../actions/';
import Post from '../components/Post';
import { categoriesToUrl, getUrlCategories, getPostId } from '../utils/urlTools';

const onCardClick = (e, history, postIdUrl, category, id) => {
  suppressOnClick(e);
  if (!postIdUrl) {
    history.push(`/${category}/${id}`);
  } else {
    history.goBack();
  }
};

const getTimeLabel = (post, postIdUrl) => (
  postIdUrl ? new Date(post.timestamp).toUTCString() : new Date(post.timestamp).toDateString()
);

const mapStateToProps = (state, { post, match, history }) => {
  const postIdUrl = getPostId(match);
  if (post) {
    const { postsComparator, timeAscending, scoreAscending } = state.posts;
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
    postIdUrl,
    loading: true,
  });
};

const mapDispatchToProps = dispatch => ({
  vote: (type, post, e) => dispatch(vote(type, post, e)),
  sortPosts: (type, e) => dispatch(sortPosts(type, e)),
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
