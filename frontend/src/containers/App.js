import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { getPosts, getCategories } from '../actions/';
import { urlToCategoriesArray, categoriesToUrl, getUrlCategories } from '../utils/urlTools';

import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPosts(null));
    dispatch(getCategories());
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
        <div style={{ paddingLeft: '256px' }}>
          <PostsContainer />
        </div>
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
