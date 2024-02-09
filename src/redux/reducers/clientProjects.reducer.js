const clientProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLIENT_PROJECTS':
        return action.payload;
      default:
        return state;
    }
};

export default clientProjects;