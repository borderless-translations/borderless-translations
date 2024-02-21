const contractorLanguages = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTRACTOR_LANGUAGES':
        return action.payload;
      default:
        return state;
    }
  };
  export default contractorLanguages;