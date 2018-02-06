import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const EditComment = ({
  commentBody, open, saveComment, cancelEdit, commentBodyEdited,
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={() => cancelEdit()}
    />,
    <FlatButton
      label="Save"
      primary
      onClick={() => saveComment()}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Comment"
        actions={actions}
        onRequestClose={() => cancelEdit()}
        open={open}
      >
        <TextField
          floatingLabelText="Comment text"
          value={commentBody}
          fullWidth
          multiLine
          onChange={event => commentBodyEdited(event)}
        />
      </Dialog>
    </div>
  );
};

EditComment.propTypes = {
  commentBody: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  saveComment: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  commentBodyEdited: PropTypes.func.isRequired,
};

export default EditComment;
