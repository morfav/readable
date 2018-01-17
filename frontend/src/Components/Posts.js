import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { withRouter } from 'react-router-dom';

import PostContainer from '../containers/PostContainer';

const Posts = ({ posts, match }) => (
  <div>
    {posts.map(post => (
      <PostContainer
        key={post.id}
        post={post}
        urlCategories={match.params.category ? match.params.category : ''}
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

export default withRouter(Posts);
