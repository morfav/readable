import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

import EditPostContainer from '../containers/EditPostContainer';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import Comments from '../containers/Comments';
import { suppressOnClick } from '../actions/';

class Post extends Component {
  constructor(props) {
    super(props);

    this.sortPosts = this.sortPosts.bind(this);
    this.vote = this.vote.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    const { postIdUrl, getComments } = this.props;
    if (postIdUrl) {
      getComments(postIdUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { postIdUrl, getComments } = nextProps;
    if (this.props.postIdUrl !== postIdUrl && postIdUrl) {
      getComments(postIdUrl);
    }
  }

  vote = (type, e) => {
    const { vote, post } = this.props;
    vote(type, post, e);
  };

  sortPosts = (type, onClickEvent) => {
    suppressOnClick(onClickEvent);
    const { postIdUrl, sortPosts } = this.props;
    if (!postIdUrl) {
      sortPosts(type);
    }
  };

  deletePost = (postId, postCategory, onClickEvent) => {
    suppressOnClick(onClickEvent);
    const { deletePost, history } = this.props;
    if (postId) {
      history.push(`/${postCategory}`);
    }
    deletePost(postId, postCategory);
  }

  render() {
    const {
      post, getArrowIcon, categoryUrl, postTime, onCardClick, postIdUrl, comments, editPost,
    } = this.props;
    return (
      <div className="Post">
        <Card
          onClick={e => onCardClick(e)}
          style={{ maxWidth: '800px', padding: '1px' }}
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
        </Card>
        {postIdUrl ? (
          <Comments comments={comments} parentId={post.id} />
        )
          : null}
        <EditPostContainer />
      </div>
    );
  }
}

Post.propTypes = {
  postIdUrl: PropTypes.string.isRequired,
  getComments: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
  sortPosts: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getArrowIcon: PropTypes.func.isRequired,
  categoryUrl: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(object).isRequired,
  editPost: PropTypes.func.isRequired,
};

export default withRouter(Post);
