import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card } from 'material-ui/Card';

import PostHeader from '../components/PostHeader';
import PostFooter from '../components/PostFooter';

class Post extends Component {
  constructor() {
    super();

    this.sortByTimeNoPropagation = this.sortByTimeNoPropagation.bind(this);
    this.sortByScoreNoPropagation = this.sortByScoreNoPropagation.bind(this);
    this.incrementVoteNoClickPropagation = this.incrementVoteNoClickPropagation.bind(this);
    this.decrementVoteNoClickPropagation = this.decrementVoteNoClickPropagation.bind(this);
  }

  sortByTimeNoPropagation = e => (
    this.props.sortNoClickPropagation(e, this.props.sortByTime)
  );

  sortByScoreNoPropagation = e => (
    this.props.sortNoClickPropagation(e, this.props.sortByScore)
  )

  incrementVoteNoClickPropagation = e => (
    this.props.voteNoClickPropagation(this.props.post, e, this.props.incrementVote)
  );

  decrementVoteNoClickPropagation = e => (
    this.props.voteNoClickPropagation(this.props.post, e, this.props.decrementVote)
  );

  render() {
    const { post, history, getArrowIcon } = this.props;
    return (
      <div className="Post">
        <Card
          onClick={() => history.push(`${post.category}/${post.id}`)}
        >
          <PostHeader
            post={post}
            sortByTimeNoPropagation={this.sortByTimeNoPropagation}
            getArrowIcon={type => getArrowIcon(type)}
          />
          <PostFooter
            post={post}
            incrementVoteNoClickPropagation={this.incrementVoteNoClickPropagation}
            decrementVoteNoClickPropagation={this.decrementVoteNoClickPropagation}
            categoryClicked={this.categoryClicked}
            sortByScoreNoPropagation={this.sortByScoreNoPropagation}
            getArrowIcon={type => getArrowIcon(type)}
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(Post);
