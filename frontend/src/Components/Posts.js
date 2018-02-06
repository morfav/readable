import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';

import EditPostContainer from '../containers/EditPostContainer';
import PostContainer from '../containers/PostContainer';

class Posts extends Component {
  componentWillMount() {
    const { postIdUrl, posts, getPost } = this.props;
    if (postIdUrl && !posts.length) {
      getPost(postIdUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { postIdUrl, getPost } = nextProps;
    if (this.props.postIdUrl !== postIdUrl && postIdUrl) {
      getPost(postIdUrl);
    }
  }

  render() {
    const {
      posts, newPostClicked, postIdUrl, postDetailsLoading,
    } = this.props;
    let postsComponent = null;
    if (posts.length) {
      postsComponent = posts.map(post => (
        <PostContainer
          key={post.id}
          post={post}
        />
      ));
    } else if (postIdUrl) {
      if (postDetailsLoading) {
        postsComponent = 'Post loading...';
      } else {
        postsComponent = (
          <Snackbar
            open
            message="Post not found"
          />
        );
      }
    }
    return (
      <div>
        {postsComponent}
        {!postIdUrl
          && (
          <FloatingActionButton style={{ position: 'fixed', right: 30, bottom: 30 }} onClick={newPostClicked}>
            <ContentAdd />
          </FloatingActionButton>
          )
        }
        <EditPostContainer />
      </div>
    );
  }
}

Posts.propTypes = {
  postIdUrl: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(Object).isRequired,
  getPost: PropTypes.func.isRequired,
  newPostClicked: PropTypes.func.isRequired,
  postDetailsLoading: PropTypes.bool.isRequired,
};

export default Posts;
