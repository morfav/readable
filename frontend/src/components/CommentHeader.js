import React from 'react';
import { CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

const CommentHeader = ({ comment, commentTime }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton tooltip="Comment" style={{ top: 12, right: 12 }}>
          <CommentIcon />
        </IconButton>
      </div>
      <div
        style={{ width: 'auto', height: '36px', lineHeight: '36px', textTransform: 'uppercase', paddingLeft: '16px', fontSize: '14px' }}
        >
        {commentTime}
      </div>
      <CardTitle
        style={{ paddingTop: '0px' }}
        title={comment.title}
        subtitle={`by ${comment.author}`}
      />
    </div>
  );
};

export default CommentHeader;
