const allServices = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SERVICES':
        return action.payload;
      default:
        return state;
    }
};

export default allServices;