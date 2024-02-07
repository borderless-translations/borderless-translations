const allProjects = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PROJECTS':
      return action.payload;
    default:
      return state;
  }
};
export default allProjects;