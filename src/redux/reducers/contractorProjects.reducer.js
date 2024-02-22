const contractorProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTRACTOR_PROJECTS':
        return action.payload;
      default:
        return state;
    }
  };
  export default contractorProjects;