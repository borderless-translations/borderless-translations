const allClients = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_CLIENTS':
        return action.payload;
      default:
        return state;
    }
};
export default allClients;