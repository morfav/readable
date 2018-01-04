import { Link, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts, categoryClicked, selectCategory } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  componentDidMount() {
    fetchPosts().then(posts => this.props.addPosts(posts));
    fetchCategories().then(({ categories }) => this.props.addCategories(categories));
    const urlCategory = this.props.match.params.category;
    if (urlCategory) {
      this.props.selectCategory(urlCategory);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Categories
            categories={this.props.categories}
            selectedCategories={this.props.selectedCategories}
            onClick={this.props.categoryClicked}
          />
        </div>
        {/* <Route */}
          {/* path="/" */}
          {/* exact */}
          {/* render={() => ( */}
        <div style={{ paddingLeft: '256px' }}>
          <PostsContainer />
        </div>
          {/* )} */}
          {/* /> */}
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
    selectedCategories: state.categories.selectedCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: categories => dispatch(addCategories(categories)),
    addPosts: posts => dispatch(addPosts(posts)),
    categoryClicked: category => dispatch(categoryClicked(category)),
    selectCategory: category => dispatch(selectCategory(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
