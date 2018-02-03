import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import PostContainer from '../containers/PostContainer';
import EditPostContainer from '../containers/EditPostContainer';

const Posts = ({ posts, newPostClicked }) => (
  <div>
    {posts.map(post => (
      <PostContainer
        key={post.id}
        post={post}
      />
    ))}
    <FloatingActionButton style={{ position: 'fixed', right: 30, bottom: 30 }} onClick={newPostClicked}>
      <ContentAdd />
    </FloatingActionButton>
    <EditPostContainer />
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Posts;
