import { ADD_COMMENTS, DECREMENT_COMMENT_VOTE, INCREMENT_COMMENT_VOTE } from '../actions';

const emptyComments = {
  comments: [],
};

export default function comments(state = emptyComments, action) {
  switch (action.type) {
    case ADD_COMMENTS:
      const newCommentIds = action.comments.map(comment => comment.id);
      return {
        ...state,
        comments: [...state.comments.filter(comment => !newCommentIds.includes(comment.id)), ...action.comments],
      };
    case INCREMENT_COMMENT_VOTE:
      return {
        ...state,
        comments: state.comments.map(comment => (
          comment.id !== action.comment.id ?
            comment :
            Object.assign({}, action.comment, { voteScore: action.comment.voteScore + 1 })
        )),
      };
    case DECREMENT_COMMENT_VOTE:
      return {
        ...state,
        comments: state.comments.map(comment => (
          comment.id !== action.comment.id ?
            comment :
            Object.assign({}, action.comment, { voteScore: action.comment.voteScore - 1 })
        )),
      };
    default:
      return state;
  }
}
