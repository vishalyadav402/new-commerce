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
    return serializedState ? JSON.parse(serializedState) : initialState;
  } catch (err) {
    console.error("Failed to load cart state:", err);
    return initialState;
  }
};

// Helper function to save state to local storage
const saveState = (state) => {
  try {
    localStorage.setItem('cartState', JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save cart state:", err);
  }
};

const roundToTwoDecimals = (num) => Number(parseFloat(num || 0).toFixed(2));


const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState(), // Load state from local storage if available
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: roundToTwoDecimals(newItem.price),
          quantity: 1,
          totalPrice: roundToTwoDecimals(newItem.price),
          name: newItem.name,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = roundToTwoDecimals(existingItem.totalPrice + newItem.price);
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = roundToTwoDecimals(state.items.reduce((sum, item) => sum + item.totalPrice, 0));
      
      saveState(state);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (!existingItem) return;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = roundToTwoDecimals(existingItem.totalPrice - existingItem.price);
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = roundToTwoDecimals(state.items.reduce((sum, item) => sum + item.totalPrice, 0));
      
      saveState(state);
    },
    emptyCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveState(state);
    },
    setCart(state, action) {
      const updatedState = action.payload;
      updatedState.totalQuantity = updatedState.items.reduce((sum, item) => sum + item.quantity, 0);
      updatedState.totalAmount = roundToTwoDecimals(updatedState.items.reduce((sum, item) => sum + item.totalPrice, 0));
      saveState(updatedState);
      return updatedState;
    }
  },
});

export const { addItem, removeItem, emptyCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
