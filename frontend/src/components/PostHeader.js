import React from 'react';
import { CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import { TIME } from '../utils/PostsComparatorHelper';

const PostHeader = ({ post, sortByTimeNoPropagation, getArrowIcon }) => {
  const icon = getArrowIcon(TIME);
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          right: 24,
          zIndex: 1000,
        }}
      >
        <Badge
          badgeContent={post.commentCount}
          secondary
          badgeStyle={{ top: 12, right: 12 }}
        >
          <IconButton tooltip="Comments">
            <CommentIcon />
          </IconButton>
        </Badge>
      </div>
      <FlatButton
        label={new Date(post.timestamp).toDateString()}
        labelPosition="before"
        onClick={e => sortByTimeNoPropagation(e)}
        style={{ width: 'auto' }}
        icon={icon}
      />
      <CardTitle
        title={post.title}
        subtitle={`by ${post.author}`}
      />
    </div>
  );
};

export default PostHeader;
