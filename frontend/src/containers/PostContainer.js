import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { vote, sortPosts, suppressOnClick, editExistingPost, getComments, deletePost } from '../actions/';
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
  postIdUrl ? new Date(post.timestamp).toUTCString() : new Date(post.timestamp).toDateString()
);

const mapStateToProps = (state, { post, match, history }) => {
  const postIdUrl = getPostId(match);
  const { postsComparator, timeAscending, scoreAscending } = state.posts;
  const categoryUrl = categoriesToUrl(getUrlCategories(match))(post.category);
  const postTime = getTimeLabel(post, postIdUrl);
  const comments = state.comments.comments.filter(comment =>
    (comment.parentId === postIdUrl) && !comment.deleted);
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
    comments,
    onCardClick: e => onCardClick(e, history, postIdUrl, post.category, post.id),
  });
};

const mapDispatchToProps = dispatch => ({
  vote: (type, post, e) => dispatch(vote(type, post, e)),
  sortPosts: (type, e) => dispatch(sortPosts(type, e)),
  editPost: (postId, e) => dispatch(editExistingPost(postId, e)),
  getComments: postIdUrl => dispatch(getComments(postIdUrl)),
  deletePost: (postId, postCategory) => dispatch(deletePost(postId, postCategory)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
