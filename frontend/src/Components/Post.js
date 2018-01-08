import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
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
import { Link } from 'react-router-dom';

const Post = ({ post, categoryClicked, incrementVotes, decrementVotes, sortByTime, sortByScore }) => (
  <div className="Post">
    <Link
      to="test"
      style={{
        textDecoration: 'none',
      }}
    >
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
        <CardHeader
          title={new Date(post.timestamp).toDateString()}
          onClick={() => sortByTime()}
        />
        <CardTitle
          title={post.title}
          subtitle={`by ${post.author}`}
        />
        <CardText>
          {post.body}
        </CardText>
        <div style={{ width: '100%', position: 'relative', paddingBottom: '8px' }}>
          <div style={{ paddingLeft: 12 }}>
            <CardActions style={{ display: 'inline-flex', verticalAlign: 'bottom' }}>
              <RaisedButton icon={<RemoveIcon />} style={{ float: 'left', minWidth: '48px' }} onClick={() => decrementVotes(post)} />
              <RaisedButton icon={<AddIcon />} style={{ float: 'left', minWidth: '48px', marginRight: 0 }} onClick={() => incrementVotes(post)} />
            </CardActions>
            <Badge
              badgeContent={post.voteScore}
              primary
              badgeStyle={{ top: 12, right: 12 }}
              style={{ paddingLeft: 0, paddingBottom: 0, verticalAlign: 'middle' }}
              onClick={() => sortByScore()}
            >
              <IconButton tooltip="Votes">
                <PlusOneIcon />
              </IconButton>
            </Badge>
            <Chip
              style={{
                margin: 4, right: 16, bottom: 16, position: 'absolute', display: 'inline-block',
              }}
              onClick={() => categoryClicked(post.category)}
            >
              #{post.category}
            </Chip>
          </div>
        </div>
      </Card>
    </Link>
  </div>
);

export default Post;
