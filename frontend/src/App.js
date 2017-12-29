import React, { Component } from 'react';
import './App.css';

import Posts from './Components/Posts';
import { fetchPosts } from './Utils/api';

class App extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    fetchPosts().then((posts) => {
      this.setState({
        posts,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
