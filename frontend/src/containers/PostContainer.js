import { connect } from 'react-redux';

import { incrementVote, decrementVote, categoryClicked } from '../actions/';
import Post from '../components/Post';

const mapStateToProps = (state, { post }) => (
  {
    post,
  }
);

const mapDispatchToProps = dispatch => ({
  categoryClicked: category => dispatch(categoryClicked(category)),
  incrementVotes: post => dispatch(incrementVote(post)),
  decrementVotes: post => dispatch(decrementVote(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
