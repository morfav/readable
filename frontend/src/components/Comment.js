import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import CommentHeader from '../components/CommentHeader';
import CommentFooter from '../components/CommentFooter';

const Comment = ({
  comment, handleClick,
}) => (
  <div className="Comment">
    <Card
      style={{
        margin: '10px', borderRadius: '10px', maxWidth: '780px',
      }}
      onClick={e => handleClick(comment, e)}
    >
      <CommentHeader
        comment={comment}
        commentTime={new Date(comment.timestamp).toUTCString()}
      />
      <CardText style={{ paddingBottom: '0px' }}>
        {comment.body}
      </CardText>
      <CommentFooter
        comment={comment}
        handleClick={handleClick}
      />
    </Card>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Comment;
