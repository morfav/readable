export const TIME = 'timestamp';
export const SCORE = 'voteScore';

const getComparator = (type, isAscending, objectsToSort) => {
  // Condition for 0 needed to ensure stability of sort on Chrome
  if (isAscending) {
    return ((postOne, postTwo) => (postOne[type] - postTwo[type] === 0 ? objectsToSort.indexOf(postOne) - objectsToSort.indexOf(postTwo) : postOne[type] - postTwo[type]));
  }
  return ((postOne, postTwo) => (postTwo[type] - postOne[type] === 0 ? objectsToSort.indexOf(postOne) - objectsToSort.indexOf(postTwo) : postTwo[type] - postOne[type]));
};

export default getComparator;
