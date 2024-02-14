const project = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return action.payload;
    default:
      return state;
  }
};
export default project;