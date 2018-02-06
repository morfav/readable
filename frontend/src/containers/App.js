import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Categories from '../components/Categories';
import PostsContainer from './PostsContainer';

import { getPosts, getCategories } from '../actions/';
import { urlToCategoriesArray, categoriesToUrl, getUrlCategories } from '../utils/urlTools';

class App extends Component {
  componentDidMount() {
    const { loadPosts, loadCategories } = this.props;
    loadPosts();
    loadCategories();
  }

  render() {
    const { categories, urlCategories } = this.props;
    return (
      <div className="App">
        <div>
          <Categories
            categories={categories}
            selectedCategories={urlToCategoriesArray(urlCategories)}
            categoryUrl={category => categoriesToUrl(urlCategories)(category)}
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
    categories: state.categories.categories.sort(),
    urlCategories: getUrlCategories(ownProps.match),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(getPosts(null)),
    loadCategories: () => dispatch(getCategories()),
  };
}

App.propTypes = {
  categories: PropTypes.arrayOf(String).isRequired,
  urlCategories: PropTypes.string.isRequired,
  loadPosts: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
