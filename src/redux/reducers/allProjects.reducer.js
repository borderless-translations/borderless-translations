// TODO: rename reducer below
// TODO: change default state to match needed data type
const templateReducer = (state = [], action) => {
    switch (action.type) {
      case 'ACTION_TYPE': // TODO: Set string "ACTION_TYPE" to the appropriate action.type
        return action.payload;
      default:
        return state;
    }
};

// TODO: Rename export to match new reducer name
export default templateReducer;
// TODO: Don't forget to add the function to _root.reducer.js