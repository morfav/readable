import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import Comment from './Comment';


const Comments = ({ comments }) => (
  <div>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />))}
    <FloatingActionButton style={{ position: 'absolute', right: 30, bottom: 30 }}>
      <CommentIcon />
    </FloatingActionButton>
  </div>
);

export default Comments;
