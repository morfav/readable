import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <Card>
    <CardHeader
      title={`Category: ${post.category}`}
    />
    <CardTitle
      title={post.title}
      subtitle={`by ${post.author}`}
    />
    <CardText>
      {post.body}
    </CardText>
  </Card>
);

export default Post;
