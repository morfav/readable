import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

import EditPostContainer from '../containers/EditPostContainer';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import Comments from './Comments';
import { suppressOnClick, getComments, deletePost } from '../actions/';

class Post extends Component {
  constructor(props) {
    super(props);

    this.sortPosts = this.sortPosts.bind(this);
    this.vote = this.vote.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.postIdUrl !== nextProps.postIdUrl && nextProps.postIdUrl) {
      const { postIdUrl, dispatch } = nextProps;
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

  deletePost = (postId, postCategory, onClickEvent) => {
    suppressOnClick(onClickEvent);
    if (postId) {
      this.props.history.push(`/${postCategory}`);
    }
    const { dispatch } = this.props;
    dispatch(deletePost(postId, postCategory));
  }

  render() {
    const { post, history, getArrowIcon, categoryUrl, postTime, loading, onCardClick, postIdUrl, comments, editPost, postNotFound } = this.props;
    if (loading) {
      return (
        <div>Loading...</div>
      );
    } else if (postNotFound) {
      return (
        <div>Post not found</div>
      );
    }
    return (
      <div className="Post">
        <Card
          onClick={e => onCardClick(e)}
          style={{ maxWidth: '800px' }}
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
            deletePost={this.deletePost}
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
