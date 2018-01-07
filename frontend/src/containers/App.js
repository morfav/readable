import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts, categoryClicked, selectCategory, selectCategories } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  constructor() {
    super();
    this.categoryClicked = this.categoryClicked.bind(this);
  }

  componentDidMount() {
    fetchPosts().then((posts) => this.props.addPosts(posts));
    fetchCategories().then(({ categories }) => this.props.addCategories(categories));
    const urlCategory = this.props.match.params.category ? this.props.match.params.category.split(",") : 0;
    if (urlCategory) {
      const categoriesToAdd = [];
      urlCategory.map(category =>
        (!this.props.selectedCategories.includes(category) ? categoriesToAdd.push(category) : ''));
      this.props.selectCategories(categoriesToAdd);
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldCategories = this.props.match.params.category ? this.props.match.params.category.split(',') : [];
    const newCategories = nextProps.selectedCategories;
    let urlNeedsUpdate = false;
    if (oldCategories.length !== newCategories.length) {
      urlNeedsUpdate = true;
    }
    if (!urlNeedsUpdate) {
      oldCategories.forEach(category => (!newCategories.includes(category) ? (urlNeedsUpdate = true) : ''));
    }
    if (urlNeedsUpdate) {
      this.props.history.push(nextProps.selectedCategories.join(","));
    }
  }

  categoryClicked(categoryName) {
    this.props.categoryClicked(categoryName);
  }

  render() {
    return (
      <div className="App">
        <div>
          <Categories
            categories={this.props.categories}
            selectedCategories={this.props.selectedCategories}
            onClick={categoryName => this.categoryClicked(categoryName)}
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
    selectCategories: categories => dispatch(selectCategories(categories)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
