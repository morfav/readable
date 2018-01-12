import { connect } from 'react-redux';

import { incrementVote, decrementVote, categoryClicked, sortByTime, sortByScore } from '../actions/';
import Post from '../containers/Post';

const mapStateToProps = (state, { post }) => (
  {
    post,
    postsComparator: state.posts.postsComparator,
    timeAscending: state.posts.timeAscending,
    scoreAscending: state.posts.scoreAscending,
  }
);

const mapDispatchToProps = dispatch => ({
  categoryClicked: category => dispatch(categoryClicked(category)),
  incrementVotes: post => dispatch(incrementVote(post)),
  decrementVotes: post => dispatch(decrementVote(post)),
  sortByTime: () => dispatch(sortByTime()),
  sortByScore: () => dispatch(sortByScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
