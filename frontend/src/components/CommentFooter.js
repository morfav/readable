import React from 'react';
import { connect } from 'react-redux';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';

import Badge from 'material-ui/Badge';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import { vote, DECREMENT_COMMENT_VOTE, INCREMENT_COMMENT_VOTE, deleteComment } from '../actions/';

const CommentFooter = ({ comment, dispatch, handleClick }) => {
  return (
    <div style={{ width: '100%', position: 'relative', paddingBottom: '8px' }}>
      <div style={{ paddingLeft: 12 }}>
        <CardActions style={{ display: 'inline-flex', verticalAlign: 'bottom' }}>
          <RaisedButton
            icon={<RemoveIcon />}
            style={{ float: 'left', minWidth: '36px', height: '24px' }}
            onClick={e => dispatch(vote(DECREMENT_COMMENT_VOTE, comment, e))}
          />
          <RaisedButton
            icon={<AddIcon />}
            style={{
              float: 'left', minWidth: '36px', height: '24px', marginRight: 0,
            }}
            onClick={e => dispatch(vote(INCREMENT_COMMENT_VOTE, comment, e))}
          />
        </CardActions>
        <Badge
          badgeContent={comment.voteScore}
          secondary
          badgeStyle={{ top: 12, right: 12 }}
          style={{ paddingLeft: 0, paddingBottom: 0, verticalAlign: 'middle', height: '44px' }}
        >
          <IconButton tooltip="Votes" iconStyle={{ display: 'inline-flex' }}>
            <div>
              <PlusOneIcon />
            </div>
          </IconButton>
        </Badge>
        <IconButton tooltip="Edit Post" style={{ verticalAlign: 'bottom' }} onClick={e => handleClick(comment, e)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton tooltip="Delete comment" style={{ verticalAlign: 'bottom' }} onClick={e => dispatch(deleteComment(comment, e))}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(CommentFooter);
