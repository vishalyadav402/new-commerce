import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load cart state:", err);
    return initialState;
  }
};

// Helper function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error("Failed to save cart state:", err);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState(), // Load state from local storage if available
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          image:newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      saveState(state); // Save updated state to local storage
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (!existingItem) return;
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      saveState(state); // Save updated state to local storage
    },
    emptyCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveState(state); // Save the empty state to local storage
    },
    setCart(state, action) {
      const updatedState = action.payload;
      saveState(updatedState); // Save the new cart state to local storage
      return updatedState;
    }
  },
});

export const { addItem, removeItem, emptyCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
