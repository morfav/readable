import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addPosts, addCategory } from '../actions/';
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
        <div>
          <Categories
            categories={this.props.categories}
            onClick={this.props.addCategory}
          />
        </div>
        <div style={{ paddingLeft: '256px' }}>
          <PostsContainer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: [...state.posts.map(post => post.category)
      .reduce((set, category) => set.add(category), new Set())]
      .sort(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPosts: posts => dispatch(addPosts(posts)),
    addCategory: category => dispatch(addCategory(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
