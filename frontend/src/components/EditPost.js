import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const EditPost = ({ postTitle, postBody, postCategory, categories, open, savePost, cancelEdit, postBodyEdited, postTitleEdited, postCategoryChanged, newPost }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={() => cancelEdit()}
    />,
    <FlatButton
      label="Save"
      primary
      onClick={() => savePost()}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Edit Post"
        actions={actions}
        onRequestClose={() => cancelEdit()}
        open={open}
      >
        <TextField
          floatingLabelText="Title"
          value={postTitle}
          fullWidth
          multiLine
          onChange={event => postTitleEdited(event)}
        />
        <TextField
          floatingLabelText="Body"
          value={postBody}
          fullWidth
          multiLine
          onChange={event => postBodyEdited(event)}
        />
        <DropDownMenu value={postCategory} onChange={(event, index, value) => postCategoryChanged(event, value)} disabled={!newPost}>
          {categories.map(category =>
            <MenuItem key={category.path} value={category.path} primaryText={category.name} />)}
        </DropDownMenu>
      </Dialog>
    </div>
  );
};

export default EditPost;
