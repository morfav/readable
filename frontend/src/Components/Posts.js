import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import PostContainer from '../containers/PostContainer';
import EditPostContainer from '../containers/EditPostContainer';
import { postDetailsLoading } from '../actions/index';

class Posts extends Component {
  componentWillMount() {
    if (this.props.postIdUrl && !this.props.length) {
      const { postIdUrl } = this.props;
      this.props.getPost(postIdUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.postIdUrl !== nextProps.postIdUrl) {
      const { postIdUrl } = nextProps;
      nextProps.getPost(postIdUrl);
    }
  }

  render() {
    const { posts, newPostClicked, postIdUrl, postDetailsLoading } = this.props
    return (
      <div>
        {posts.length ?
          posts.map(post => (
            <PostContainer
              key={post.id}
              post={post}
            />
          ))
          : postIdUrl ? (postDetailsLoading ? (<div>Post loading...</div>) : (<div>Not found</div>)) : null
        }
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
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Posts;
