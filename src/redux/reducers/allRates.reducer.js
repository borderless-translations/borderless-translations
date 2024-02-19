const allRates = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_RATES':
        return action.payload;
      default:
        return state;
    }
};

export default allRates;