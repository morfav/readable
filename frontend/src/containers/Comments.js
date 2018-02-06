import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

import Comment from '../components/Comment';
import EditComment from '../components/EditComment';
import { suppressOnClick, updateComment, createComment } from '../actions/';


class Comments extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.createCommentClicked = this.createCommentClicked.bind(this);
  }

  state = {
    editCommentShowing: false,
    commentToEdit: null,
    commentBody: '',
  };

  handleClick = (comment, e) => {
    suppressOnClick(e);
    this.setState({
      editCommentShowing: true,
      commentToEdit: comment,
      commentBody: comment.body,
    });
  }

  createCommentClicked = (e) => {
    suppressOnClick(e);
    this.setState({
      editCommentShowing: true,
      commentToEdit: null,
      commentBody: '',
    });
  }

  cancelEdit = () => {
    this.setState({
      editCommentShowing: false,
    });
  }

  saveComment = () => {
    this.setState({
      editCommentShowing: false,
    });
    if (this.state.commentToEdit) {
      this.props.updateComment(this.state.commentToEdit, this.state.commentBody);
    } else {
      this.props.createComment(this.state.commentBody, this.props.parentId);
    }
  }

  handleChange = event => (
    this.setState({ commentBody: event.target.value })
  );

  render() {
    const { comments } = this.props;
    return (
      <div>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} handleClick={this.handleClick} />))}
        <FloatingActionButton
          style={{ position: 'fixed', right: 30, bottom: 30 }}
          onClick={e => this.createCommentClicked(e)}
        >
          <CommentIcon />
        </FloatingActionButton>
        <EditComment
          open={this.state.editCommentShowing}
          cancelEdit={this.cancelEdit}
          commentBody={this.state.commentBody ? this.state.commentBody : ''}
          saveComment={this.saveComment}
          commentBodyEdited={this.handleChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateComment: (comment, newBody) => dispatch(updateComment(comment, newBody)),
  createComment: (commentBody, parentId) => dispatch(createComment(commentBody, parentId)),
});

Comments.propTypes = {
  parentId: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(object).isRequired,
};

export default connect(null, mapDispatchToProps)(Comments);
