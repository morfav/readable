import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const Posts = ({ posts }) => (
  <div>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
};

export default Posts;
