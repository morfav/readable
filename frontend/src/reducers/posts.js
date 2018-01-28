import { ADD_POSTS, INCREMENT_POST_VOTE, DECREMENT_POST_VOTE, SORT_BY_TIME, SORT_BY_SCORE } from '../actions';
import { TIME, SCORE } from '../utils/PostsComparatorHelper';

const initialPostsState = {
  posts: [],
  postsComparator: TIME,
  timeAscending: true,
  scoreAscending: true,
};

export default function posts(state = initialPostsState, action) {
  switch (action.type) {
    case ADD_POSTS:
    const newPostIds = action.posts.map(post => post.id);
      return {
        ...state,
        posts: [...state.posts.filter(post => !newPostIds.includes(post.id)), ...action.posts],
      };
    case INCREMENT_POST_VOTE:
      return {
        ...state,
        posts: state.posts.map(post => (
          post.id !== action.post.id ?
            post :
            Object.assign({}, action.post, { voteScore: action.post.voteScore + 1 })
        )),
      };
    case DECREMENT_POST_VOTE:
      return {
        ...state,
        posts: state.posts.map(post => (
          post.id !== action.post.id ?
            post :
            Object.assign({}, action.post, { voteScore: action.post.voteScore - 1 })
        )),
      };
    case SORT_BY_TIME:
      return {
        ...state,
        timeAscending: state.postsComparator === TIME ? !state.timeAscending : state.timeAscending,
        postsComparator: TIME,
      };
    case SORT_BY_SCORE:
      return {
        ...state,
        scoreAscending: state.postsComparator === SCORE ? !state.scoreAscending : state.scoreAscending,
        postsComparator: SCORE,
      };
    default:
      return state;
  }
}
