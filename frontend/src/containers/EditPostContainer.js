import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditPost from '../components/EditPost';
import { updatePost, stopEditingPost } from '../actions/';

class EditPostContainer extends Component {
  constructor() {
    super();

    this.savePost = this.savePost.bind(this);
    this.handlePostBodyChange = this.handlePostBodyChange.bind(this);
    this.handlePostTitleChange = this.handlePostTitleChange.bind(this);
    this.handlePostCategoryChange = this.handlePostCategoryChange.bind(this);
  }

  state = {
    postId: '',
    postTitle: '',
    postBody: '',
    postCategory: '',
  }

  componentWillReceiveProps(nextProps) {
    const {
      open, postIdProps, postTitleProps, postBodyProps, postCategoryProps,
    } = nextProps;
    if (!this.props.open && open) {
      this.setState({
        postId: postIdProps,
        postTitle: postTitleProps,
        postBody: postBodyProps,
        postCategory: postCategoryProps,
      });
    }
  }

  savePost() {
    const {
      postId, postTitle, postBody, postCategory,
    } = this.state;
    this.props.savePostAction(postId, postTitle, postBody, postCategory);
  }

  handlePostBodyChange(event) {
    this.setState({
      postBody: event.target.value,
    });
  }

  handlePostTitleChange(event) {
    this.setState({
      postTitle: event.target.value,
    });
  }

  handlePostCategoryChange(event, newPostCategory) {
    this.setState({
      postCategory: newPostCategory,
    });
  }

  render() {
    return (
      <EditPost
        {...this.state}
        {...this.props}
        savePost={this.savePost}
        postBodyEdited={this.handlePostBodyChange}
        postTitleEdited={this.handlePostTitleChange}
        postCategoryChanged={this.handlePostCategoryChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const open = state.posts.editingPost;
  if (state.posts.idOfEditedPost) {
    const post = state.posts.posts.find(postElement =>
      postElement.id === state.posts.idOfEditedPost);
    return ({
      newPost: false,
      postIdProps: post.id,
      postTitleProps: post.title,
      postBodyProps: post.body,
      postCategoryProps: post.category,
      categories: state.categories.categories,
      open,
    });
  }
  return ({
    newPost: true,
    postIdProps: '',
    postTitleProps: '',
    postBodyProps: '',
    postCategoryProps: state.categories.categories[0] ? state.categories.categories[0].name : '',
    categories: state.categories.categories,
    open,
  });
};

const mapDispatchToProps = dispatch => ({
  savePostAction: (postId, postTitle, postBody, postCategory) =>
    dispatch(updatePost(postId, postTitle, postBody, postCategory)),
  cancelEdit: () => dispatch(stopEditingPost()),
});

EditPostContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  postIdProps: PropTypes.string.isRequired,
  postTitleProps: PropTypes.string.isRequired,
  postBodyProps: PropTypes.string.isRequired,
  postCategoryProps: PropTypes.string.isRequired,
  savePostAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer);
