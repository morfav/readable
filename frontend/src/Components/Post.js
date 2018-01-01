import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <div className="Post">
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
  </div>
);

export default Post;
