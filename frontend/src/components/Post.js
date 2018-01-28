/**
 * Post Detail View
    Post is displayed with title, body, author, number of comments, current score and voting mechanism. Post should have buttons or links for editing or deleting that post.

    should list all of the comments for that post
    should have a control to add a new comment.
    implement comment form however you want (inline, modal, etc.)
    comments should also have controls for editing or deleting

    Listed comments are displayed with author, current score, and a voting mechanism to upvote or downvote the comment.
    Comments should have buttons or links for editing or deleting that comment.
    The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.
    All comments for a post are displayed below the post body.
    A mechanism for adding a new comment is visible on the detail page and functional.
    should have controls to edit or delete the post
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import Comment from './Comment';
import { suppressOnClick, getPosts, getComments } from '../actions/';

class Post extends Component {
  constructor(props) {
    super(props);

    this.sortPosts = this.sortPosts.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.props.postIdUrl) {
      const { postIdUrl, dispatch } = this.props;
      dispatch(getPosts(postIdUrl));
      dispatch(getComments(postIdUrl));
    }
  }

  vote = (type, e) => {
    this.props.vote(type, this.props.post, e);
  };

  sortPosts = (type, onClickEvent) => {
    suppressOnClick(onClickEvent);
    !this.props.postIdUrl && this.props.sortPosts(type)
  };

  render() {
    const { post, history, getArrowIcon, categoryUrl, postTime, loading, onCardClick, postIdUrl, comments } = this.props;
    if (loading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="Post">
        <Card
          onClick={e => onCardClick(e)}
        >
          <PostHeader
            post={post}
            sortPosts={this.sortPosts}
            getArrowIcon={type => getArrowIcon(type)}
            postTime={postTime}
          />
          {postIdUrl ? (
            <CardText>
              {post.body}
            </CardText>
            ) : null
          }
          <PostFooter
            post={post}
            vote={this.vote}
            categoryClicked={this.categoryClicked}
            sortPosts={this.sortPosts}
            getArrowIcon={type => getArrowIcon(type)}
            categoryUrl={categoryUrl}
          />
          {postIdUrl ? (
            comments.map(comment =>
              <Comment comment={comment} />)
          ) : null}
        </Card>
      </div>
    );
  }
}

export default withRouter(Post);
