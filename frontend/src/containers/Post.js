import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card } from 'material-ui/Card';

import { TIME, getIcon } from '../utils/PostsComparatorHelper';
import PostHeader from '../components/PostHeader';
import PostFooter from '../components/PostFooter';

class Post extends Component {
  constructor() {
    super();

    this.sortByTime = this.sortByTime.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
    this.incrementVotes = this.incrementVotes.bind(this);
    this.decrementVotes = this.decrementVotes.bind(this);
    this.categoryClicked = this.categoryClicked.bind(this);
    this.getArrowIcon = this.getArrowIcon.bind(this);
  }

  sortByTime = (e) => {
    e.stopPropagation();
    this.props.sortByTime();
  }

  sortByScore = (e) => {
    e.stopPropagation();
    this.props.sortByScore();
  }

  incrementVotes = (post, e) => {
    e.stopPropagation();
    this.props.incrementVotes(post);
  }

  decrementVotes = (post, e) => {
    e.stopPropagation();
    this.props.decrementVotes(post);
  }

  categoryClicked = (category, e) => {
    e.stopPropagation();
    this.props.categoryClicked(category);
  }

  getArrowIcon = (type) => {
    return getIcon(type, type === TIME ? this.props.timeAscending : this.props.scoreAscending, this.props.postsComparator);
  }

  render() {
    const { post, history, postsComparator, timeAscending, scoreAscending } = this.props;
    return (
      <div className="Post">
        <Card
          onClick={() => history.push(`${post.category}/${post.id}`)}
        >
          <PostHeader
            post={post}
            history={history}
            postsComparator={postsComparator}
            timeAscending={timeAscending}
            sortByTime={this.sortByTime}
            getArrowIcon={this.getArrowIcon}
          />
          <PostFooter
            post={post}
            incrementVotes={this.incrementVotes}
            decrementVotes={this.decrementVotes}
            categoryClicked={this.categoryClicked}
            postsComparator={postsComparator}
            scoreAscending={scoreAscending}
            sortByScore={this.sortByScore}
            getArrowIcon={this.getArrowIcon}            
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(Post);
