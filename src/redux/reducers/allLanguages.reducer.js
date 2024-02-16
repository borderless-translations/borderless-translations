const allLanguages = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_LANGUAGES':
        return action.payload;
      default:
        return state;
    }
};

export default allLanguages;