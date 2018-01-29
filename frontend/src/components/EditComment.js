import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class EditComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: props.comment.body,
    };

    this.handleChange = this.handleChange.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  handleChange = event => (
    this.setState({ body: event.target.value })
  );

  cancelClicked = () => {
    this.setState({
      body: this.props.comment.body,
    });
    this.props.cancelEdit();
  };

  render() {
    const { comment, open, saveComment } = this.props;
    
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => this.cancelClicked()}
      />,
      <FlatButton
        label="Save"
        primary
        onClick={() => saveComment(this.state.body)}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          onRequestClose={() => this.cancelClicked()}
          open={open}
        >
          <TextField
            floatingLabelText="Comment"
            value={this.state.body}
            fullWidth
            multiLine
            onChange={this.handleChange}
          />
        </Dialog>
      </div>
    );
  }
};

export default EditComment;
