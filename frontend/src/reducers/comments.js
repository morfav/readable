import { ADD_COMMENTS } from '../actions';

export default function comments(state = [], action) {
  switch (action.type) {
    case ADD_COMMENTS:
      return [...state, ...action.comments];
    default:
      return state;
  }
}
