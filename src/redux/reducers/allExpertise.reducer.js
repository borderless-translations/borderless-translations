const allExpertise = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_EXPERTISE':
        return action.payload;
      default:
        return state;
    }
};

export default allExpertise;