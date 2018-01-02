import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <div className="Post">
    <Card>
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
      <CardTitle
        title={post.title}
        subtitle={`by ${post.author}`}
      />
      <CardText>
        {post.body}
      </CardText>
      <div style={{ position: 'relative' }}>
        <CardActions>
          <RaisedButton icon={<AddIcon />} />
          <RaisedButton icon={<RemoveIcon />} />
          <div style={{ verticalAlign: 'middle', display: 'inline-block' }}>
        <Badge
          badgeContent={post.voteScore}
          primary
          badgeStyle={{ top: 12, right: 12, verticalAlign: 'middle' }}
          >
          <IconButton tooltip="Votes">
            <PlusOneIcon />
          </IconButton>
        </Badge>
          </div>
        </CardActions>
        <Chip
          style={{
            margin: 4, right: 16, bottom: 16, position: 'absolute', verticalAlign: 'middle',
          }}
        >
          #{post.category}
        </Chip>
      </div>
    </Card>
  </div>
);
// display votescore + up/down
export default Post;
