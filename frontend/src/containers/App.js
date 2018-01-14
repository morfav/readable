import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts, categoryClicked, selectCategory, selectCategories, setShowingPost } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';
import { urlToCategoriesArray, categoriesToUrl } from '../utils/urlTools';

import Categories from '../components/Categories';
import PostDetail from '../components/PostDetail';
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
    if (nextProps.selectedCategories.length !== newCategories.length) {
      categoriesNeedToUpdate = true;
    }
    if (!categoriesNeedToUpdate) {
      nextProps.selectedCategories.forEach(category => (!newCategories.includes(category) && (categoriesNeedToUpdate = true)));
    }
    if (categoriesNeedToUpdate) {
      this.props.selectCategories(newCategories);
    }
    if (nextProps.posts.showingPost !== nextProps.urlPost) {
      this.props.setShowingPost(nextProps.urlPost);
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
        <Route
          exact
          path="/:category/:post_id"
          render={() => (
            <div style={{ paddingLeft: '256px' }}>
              <PostDetail />
            </div>
          )}
        />
        <Route
          exact
          path="/:category?"
          render={() => (
            <div style={{ paddingLeft: '256px' }}>
              <PostsContainer />
            </div>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    categories: state.categories.categories.sort(),
    selectedCategories: state.categories.selectedCategories,
    urlCategories: ownProps.match.params.category ? ownProps.match.params.category : '',
    urlPost: ownProps.match.params.post_id ? ownProps.match.params.post_id : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: categories => dispatch(addCategories(categories)),
    addPosts: posts => dispatch(addPosts(posts)),
    categoryClicked: category => dispatch(categoryClicked(category)),
    selectCategory: category => dispatch(selectCategory(category)),
    selectCategories: categories => dispatch(selectCategories(categories)),
    setShowingPost: postId => dispatch(setShowingPost(postId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
