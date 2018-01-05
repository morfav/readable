import { ADD_POSTS, INCREMENT_VOTE, DECREMENT_VOTE } from '../actions';

export default function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return [...state, ...action.posts];
    case INCREMENT_VOTE:
      return [...state.map(post => (post.id !== action.post.id ? post : Object.assign({}, action.post, { voteScore: action.post.voteScore + 1 })))];
    case DECREMENT_VOTE:
      return [...state.map(post => (post.id !== action.post.id ? post : Object.assign({}, action.post, { voteScore: action.post.voteScore - 1 })))];
    default:
      return state;
  }
}
