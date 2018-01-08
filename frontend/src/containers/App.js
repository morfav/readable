import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts, categoryClicked, selectCategory, selectCategories } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';
import { urlToCategoriesArray, categoriesToUrl } from '../utils/urlTools';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  constructor() {
    super();
    this.categoryClicked = this.categoryClicked.bind(this);
  }

  componentDidMount() {
    fetchPosts().then(posts => this.props.addPosts(posts));
    fetchCategories().then(({ categories }) => this.props.addCategories(categories));
  }

  componentWillReceiveProps(nextProps) {
    const newCategories = urlToCategoriesArray(nextProps.urlCategories);
    let categoriesNeedToUpdate = false;
    if (this.props.selectedCategories.length !== newCategories.length) {
      categoriesNeedToUpdate = true;
    }
    if (!categoriesNeedToUpdate) {
      this.props.selectedCategories.forEach(category => (!newCategories.includes(category) ? (categoriesNeedToUpdate = true) : ''));
    }
    if (categoriesNeedToUpdate) {
      this.props.selectCategories(newCategories);
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
            selectedCategories={(this.props.selectedCategories)}
            categoryUrl={category => categoriesToUrl(this.props.urlCategories)(category)}
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

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    // categories: [...state.posts.map(post => post.category)
    //   .reduce((set, category) => set.add(category), new Set())]
    //   .sort(),
    categories: state.categories.categories.sort(),
    selectedCategories: state.categories.selectedCategories,
    urlCategories: ownProps.match.params.category ? ownProps.match.params.category : '',
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
