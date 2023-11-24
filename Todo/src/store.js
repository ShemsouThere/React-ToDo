// store.js
import { createStore } from 'redux';

// Define your initial state
const initialState = {
  spaceId: null,
};

// Define your reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SPACE_ID':
      return { ...state, spaceId: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
