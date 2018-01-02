import { ADD_CATEGORIES, CATEGORY_CLICKED } from '../actions';

const emptyCategories = {
  categories: [],
  selectedCategories: [],
};

// TODO redo with Object.assign
// return Object.assign({}, state, action.category);
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
    case CATEGORY_CLICKED:
      // category was already selected, need to remove it
      if (state.selectedCategories.includes(action.category)) {
        return {
          ...state,
          selectedCategories: [
            ...state.selectedCategories.filter(category => category !== action.category),
          ],
        };
      }
      // category was not selected previously
      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.category],
      };
    default:
      return state;
  }
}
