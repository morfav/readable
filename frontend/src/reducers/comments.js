import { ADD_COMMENTS } from '../actions';

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
    default:
      return state;
  }
}
