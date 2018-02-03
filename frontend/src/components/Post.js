/**
 * Post Detail View
    Post should have buttons or links for editing or deleting that post.
    should have controls to edit or delete the post

 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

import EditPostContainer from '../containers/EditPostContainer';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import Comments from './Comments';
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
    const { post, history, getArrowIcon, categoryUrl, postTime, loading, onCardClick, postIdUrl, comments, editPost } = this.props;
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
            editPost={editPost}
          />
          {postIdUrl ? (
            <Comments comments={comments} parentId={post.id} />
          )
            : null}
        </Card>
        <EditPostContainer />
      </div>
    );
  }
}

export default withRouter(Post);
