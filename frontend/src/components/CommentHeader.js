import React from 'react';
import { CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

const CommentHeader = ({ comment, commentTime }) => (
  <div>
    <div
      style={{ height: '36px', lineHeight: '36px', textTransform: 'uppercase', paddingLeft: '16px', fontSize: '14px', display: 'inline-block' }}
    >
      {commentTime}
    </div>
    <div
      style={{
        float: 'right',
      }}
    >
      <IconButton tooltip="Comment" style={{ top: 12, right: 12 }}>
        <CommentIcon />
      </IconButton>
    </div>
    <CardTitle
      style={{ paddingTop: '0px' }}
      title={comment.title}
      subtitle={`by ${comment.author}`}
    />
  </div>
);

export default CommentHeader;
