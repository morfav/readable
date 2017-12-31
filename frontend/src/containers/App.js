import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import addPosts from '../actions/';
import fetchPosts from '../utils/api';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  componentDidMount() {
    fetchPosts().then(posts => this.props.addPosts(posts));
  }

  render() {
    return (
      <div className="App">
        <Categories />
        <PostsContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPosts: posts => dispatch(addPosts(posts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
