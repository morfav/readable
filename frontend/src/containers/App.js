import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addCategories, addPosts } from '../actions/';
import { fetchPosts, fetchCategories } from '../utils/api';
import { urlToCategoriesArray, categoriesToUrl, getUrlCategories } from '../utils/urlTools';

import Categories from '../components/Categories';
import PostContainer from '../containers/PostContainer';
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
            selectedCategories={urlToCategoriesArray(this.props.urlCategories)}
            categoryUrl={category => categoriesToUrl(this.props.urlCategories)(category)}
          />
        </div>
        <Route
          exact
          path="/:category/:post_id"
          render={() => (
            <div style={{ paddingLeft: '256px' }}>
              <PostContainer post={this.props.posts.find(post => post.id === this.props.urlPost)} />
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
    posts: state.posts.posts,
    categories: state.categories.categories.sort(),
    urlCategories: getUrlCategories(ownProps.match),
    urlPost: ownProps.match.params.post_id ? ownProps.match.params.post_id : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: categories => dispatch(addCategories(categories)),
    addPosts: posts => dispatch(addPosts(posts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
