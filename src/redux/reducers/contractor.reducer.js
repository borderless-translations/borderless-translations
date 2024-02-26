const contractor = (state = {languages:[], expertise:[], services:[]}, action) => {
  switch (action.type) {
    case 'SET_CONTRACTOR':
      return action.payload;
    default:
      return state;
  }
};
export default contractor;