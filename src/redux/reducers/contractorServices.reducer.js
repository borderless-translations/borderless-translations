const contractorServices = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTRACTOR_SERVICES':
        return action.payload;
      default:
        return state;
    }
  };
  export default contractorServices;