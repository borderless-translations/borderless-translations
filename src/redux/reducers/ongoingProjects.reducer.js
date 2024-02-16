const ongoingProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_ONGOING_PROJECTS':
        return action.payload;
      default:
        return state;
    }
};

export default ongoingProjects;