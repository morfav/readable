export const urlToCategoriesArray = (urlString) => {
  if (urlString.length === 0) {
    return [];
  }
  return urlString.split(',');
};

export const arrayCategoriesToUrl = (currentCategories, category) => {
  if (currentCategories.includes(category)) {
    const newCategories = currentCategories.filter(currentCategory => currentCategory !== category);
    if (newCategories.length > 1) {
      return newCategories.join(',');
    } else if (newCategories.length === 1) {
      return newCategories[0];
    }
    return '';
  }
  if (currentCategories.length === 0) {
    return category;
  }
  currentCategories.push(category);
  return currentCategories.join(',');
};

export const categoriesToUrl = urlString => (category) => {
  const currentCategories = urlToCategoriesArray(urlString);
  return arrayCategoriesToUrl(currentCategories, category);
};
