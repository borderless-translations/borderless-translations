const allContractors = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_CONTRACTORS':
      return action.payload;
    default:
      return state;
  }
};
export default allContractors;