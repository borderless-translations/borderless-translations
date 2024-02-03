const english = {
    "submit": "Submit",
    "firstName": "First Name",
    "lastName": "Last Name"
};

const arabic = {
    "submit": "يُقدِّم",
    "firstName": "اسم",
    "lastName": "اسم العائلة"
};

const languageReducer = (state = english, action) => {
    switch (action.type) {
      case 'arabic':
        return arabic
      default:
        return state;
    }
};

export default languageReducer;