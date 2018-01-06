import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import PostContainer from '../containers/PostContainer';

const Posts = ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostContainer
        key={post.id}
        post={post}
      />
    ))}
    <FloatingActionButton style={{ position: 'absolute', right: 30, bottom: 30 }}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Posts;
