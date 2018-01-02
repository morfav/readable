import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts, categoryClicked } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  componentDidMount() {
    fetchPosts().then(posts => this.props.addPosts(posts));
    fetchCategories().then(({ categories }) => this.props.addCategories(categories));
  }

  render() {
    return (
      <div className="App">
        <div>
          <Categories
            categories={this.props.categories}
            onClick={this.props.categoryClicked}
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
    // categories: [...state.posts.map(post => post.category)
    //   .reduce((set, category) => set.add(category), new Set())]
    //   .sort(),
    categories: state.categories.categories.sort(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: categories => dispatch(addCategories(categories)),
    addPosts: posts => dispatch(addPosts(posts)),
    categoryClicked: category => dispatch(categoryClicked(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
