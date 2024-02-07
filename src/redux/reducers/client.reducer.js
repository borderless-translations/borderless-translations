const client = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CLIENT':
      return action.payload;
    default:
      return state;
  }
};
export default client;