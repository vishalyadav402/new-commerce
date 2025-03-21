// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { setCart } from './cartSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadState()
  },
});

store.subscribe(() => {
  try {
    const state = store.getState().cart;
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
});

export default store;
