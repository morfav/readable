/**
 * Post Detail View
    Post is displayed with title, body, author, number of comments, current score and voting mechanism. Post should have buttons or links for editing or deleting that post.

    should list all of the comments for that post
    should have a control to add a new comment.
    implement comment form however you want (inline, modal, etc.)
    All comments for a post are displayed below the post body.
    should have controls to edit or delete the post
    
    Listed comments are displayed with author, current score, and a voting mechanism to upvote or downvote the comment.
    Comments should have buttons or links for editing or deleting that comment.
    The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.
    A mechanism for adding a new comment is visible on the detail page and functional.
    comments should also have controls for editing or deleting
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import CommentHeader from '../components/CommentHeader';
import CommentFooter from '../components/CommentFooter';

const Comment = ({ comment, handleClick}) => {
  if (!comment) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className="Comment">
      <Card
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
};

export default Comment;
