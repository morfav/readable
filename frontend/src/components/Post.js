import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card } from 'material-ui/Card';

import PostHeader from '../components/PostHeader';
import PostFooter from '../components/PostFooter';

class Post extends Component {
  constructor() {
    super();

    this.sortPosts = this.sortPosts.bind(this);
    this.vote = this.vote.bind(this);
  }

  sortPosts = (type, onClickEvent) => (
    this.props.sortPosts(type, onClickEvent)
  );

  vote = (type, e) => (
    this.props.vote(type, this.props.post, e)
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
            sortPosts={this.sortPosts}
            getArrowIcon={type => getArrowIcon(type)}
          />
          <PostFooter
            post={post}
            vote={this.vote}
            categoryClicked={this.categoryClicked}
            sortPosts={this.sortPosts}
            getArrowIcon={type => getArrowIcon(type)}
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(Post);
