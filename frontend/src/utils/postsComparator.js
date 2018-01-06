export const TIME = 'timestamp';
export const SCORE = 'voteScore';

const getComparator = (type, isAscending) => {
  if (isAscending) {
    return ((postOne, postTwo) => postOne[type] - postTwo[type]);
  }
  return ((postOne, postTwo) => postTwo[type] - postOne[type]);
};

export default getComparator;
