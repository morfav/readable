import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
  render() {
    return (
      <div>
        {this.props.post.title}
      </div>
    )
  }
}

export default Post;
