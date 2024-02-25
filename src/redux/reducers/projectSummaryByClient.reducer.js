const projectSummaryByClient = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PROJECT_SUMMARY_BY_CLIENT': 
        return action.payload;
      default:
        return state;
    }
};

export default projectSummaryByClient;