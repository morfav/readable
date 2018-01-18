import { ADD_CATEGORIES } from '../actions';

const emptyCategories = {
  categories: [],
};

export default function categories(state = emptyCategories, action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: [
          ...state.categories.filter(category => !action.categories.includes(category)),
          ...action.categories,
        ],
      };
    default:
      return state;
  }
}
