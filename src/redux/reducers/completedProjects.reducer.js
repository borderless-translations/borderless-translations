const completedProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPLETED_PROJECTS': 
        return action.payload;
      default:
        return state;
    }
};

export default completedProjects;