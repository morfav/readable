// postTitle, postBody, postCategory, categories, open, savePost, cancelEdit, postBodyEdited, postTitleEdited, postCategoryChanged
import React, { Component } from 'react';
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
    postId: null,
    postTitle: '',
    postBody: '',
    postCategory: null,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        postId: nextProps.postIdProps,
        postTitle: nextProps.postTitleProps,
        postBody: nextProps.postBodyProps,
        postCategory: nextProps.postCategoryProps,
      });
    }
  }

  savePost() {
    const { postId, postTitle, postBody, postCategory } = this.state;
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
    const post = state.posts.posts.find(postElement => postElement.id === state.posts.idOfEditedPost);
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
    postIdProps: null,
    postTitleProps: '',
    postBodyProps: '',
    postCategoryProps:  state.categories.categories[0] ? state.categories.categories[0].name : '',
    categories: state.categories.categories,
    open,
  });
};

const mapDispatchToProps = dispatch => ({
  savePostAction: (postId, postTitle, postBody, postCategory) => dispatch(updatePost(postId, postTitle, postBody, postCategory)),
  cancelEdit: () => dispatch(stopEditingPost()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer);
