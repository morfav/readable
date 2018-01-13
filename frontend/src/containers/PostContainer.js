import { connect } from 'react-redux';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import { incrementVote, decrementVote, categoryClicked, sortByTime, sortByScore } from '../actions/';
import Post from '../components/Post';

const sortNoClickPropagation = (e, sortFunctionToCall) => {
  e.stopPropagation();
  sortFunctionToCall();
};

const voteNoClickPropagation = (post, e, functionToCall) => {
  e.stopPropagation();
  functionToCall(post);
};

const categoryClickedNoPropagation = (category, e) => {
  e.stopPropagation();
  this.props.categoryClicked(category);
};

const mapStateToProps = (state, { post }) => {
  const { postsComparator, timeAscending, scoreAscending } = state.posts;
  return ({
    post,
    getArrowIcon: type => getIcon(type, type === TIME ? timeAscending : scoreAscending, postsComparator),
    sortNoClickPropagation,
    voteNoClickPropagation,
  });
};

const mapDispatchToProps = dispatch => ({
  categoryClicked: category => dispatch(categoryClicked(category)),
  incrementVote: post => dispatch(incrementVote(post)),
  decrementVote: post => dispatch(decrementVote(post)),
  sortByTime: () => dispatch(sortByTime()),
  sortByScore: () => dispatch(sortByScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
