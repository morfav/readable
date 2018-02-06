import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'material-ui/Badge';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import { CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import { TIME } from '../utils/PostsComparatorHelper';
import { SORT_BY_TIME } from '../actions/';

const PostHeader = ({
  post, sortPosts, getArrowIcon, postTime,
}) => {
  const icon = getArrowIcon(TIME);
  return (
    <div>
      <FlatButton
        label={postTime}
        labelPosition="before"
        onClick={e => sortPosts(SORT_BY_TIME, e)}
        style={{ width: 'auto' }}
        icon={icon}
      />
      <div
        style={{
          float: 'right',
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
      <CardTitle
        title={post.title}
        subtitle={`by ${post.author}`}
      />
    </div>
  );
};

PostHeader.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  sortPosts: PropTypes.func.isRequired,
  getArrowIcon: PropTypes.func.isRequired,
  postTime: PropTypes.string.isRequired,
};

export default PostHeader;
