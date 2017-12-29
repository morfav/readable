import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div>
      {this.props.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
    )
  }
}

export default Posts;
