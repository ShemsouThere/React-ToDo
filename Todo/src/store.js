import { createStore } from 'redux';

// Define your initial state
const initialState = {
  spaceId: null,
  userId: null, // Include userId in the initial state
};

// Define your reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SPACE_ID':
      return { ...state, spaceId: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload }; // Handle setting the userId
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
