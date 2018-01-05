import React from 'react';
import PropTypes from 'prop-types';

import PostContainer from '../containers/PostContainer';

const Posts = ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostContainer
        key={post.id}
        post={post}
      />
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Posts;
