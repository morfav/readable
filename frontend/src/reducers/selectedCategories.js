import { CATEGORY_CLICKED } from '../actions';

export default function selectedCategories(categories = new Set(), action) {
  switch (action.type) {
    case CATEGORY_CLICKED:
      // category was already selected, need to remove it
      if (categories.has(action.category)) {
        return new Set([...categories].filter(category => category !== action.category));
      }
      // category was not selected previously
      return new Set([...categories, action.category]);
      // return Object.assign({}, state, action.category);
    default:
      return categories;
  }
}
