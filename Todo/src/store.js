// store.js
import { createStore } from 'redux';


// Define your initial state
const initialState = {
  spaceId: null,
  userId: null,
  userObject: null,
};

// Define your reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SPACE_ID':
      return { ...state, spaceId: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
      case 'SET_USER_MAIL':
        return { ...state, email: action.payload };
    case 'SET_USER_OBJECT':
      return { ...state, userObject: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;

