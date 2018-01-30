import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const EditComment = ({ commentBody, open, saveComment, cancelEdit, commentBodyEdited }) => {
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
        title="Edit Comment"
        actions={actions}
        onRequestClose={() => cancelEdit()}
        open={open}
      >
        <TextField
          floatingLabelText="Comment"
          value={commentBody}
          fullWidth
          multiLine
          onChange={event => commentBodyEdited(event)}
        />
      </Dialog>
    </div>
  );
};

export default EditComment;
