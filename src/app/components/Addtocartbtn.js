"use client";
import { addItem, removeItem } from '@/store/cartSlice';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Addtocartbtn = ({ data, pagetitle}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Get the quantity of the current item from the Redux store
  const getItemQuantity = (id) => {
    const item = cartItems?.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Synchronize local quantity state with Redux state on component mount
    setQuantity(getItemQuantity(data.ProductID));
  }, [cartItems, data.ProductID]);

  const handleAddItem = () => {
    dispatch(addItem({ id: data.ProductID, name: data.ProductName, price: parseInt(data.ProductPrice),image: data.ProductImage }));
  };

  // console.log(JSON.stringify(data)); 
  const handleRemoveItem = () => {
    dispatch(removeItem(data.ProductID));
  };

  const increment = () => {
    handleAddItem();
  };

  const decrement = () => {
    if (quantity > 1) {
      handleRemoveItem();
    } else {
      handleRemoveItem();
    }
  };

  return (
    <>
    {pagetitle=="previewpage" ?<div className="flex items-center space-x-2 rounded-md bg-green-600 text-white">
      {quantity > 0 ? (
        <>
          <button
            onClick={() => {
              decrement();
            }}
            className="text-green-50 py-1 px-2 font-semibold rounded"
          >
            -
          </button>
          <span className="text-green-50 py-1 w-3 font-semibold text-sm text-center">
            {quantity}
          </span>
          <button
            onClick={() => {
              increment();
            }}
            className="text-green-50 py-1 px-2 font-semibold rounded"
          >
            +
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            increment();
          }}
          className="px-4 py-[0.4em] font-medium text-[0.9em] bg-green-50 text-green-700 rounded-md border border-green-600"
        >
          ADD TO CART
        </button>
      )}
    </div>
    :
    <div className="flex items-center space-x-2 rounded-md bg-pink-dark text-beige-light">
      {quantity > 0 ? (
        <>
          <button
            onClick={() => {
              decrement();
            }}
            className="text-green-50 py-[0.4em] ps-2 font-semibold rounded"
          >
            -
          </button>
          <span className="text-green-50 py-[0.4em] w-4 font-semibold text-sm text-center">
            {quantity}
          </span>
          <button
            onClick={() => {
              increment();
            }}
            className="text-green-50 py-[0.4em] pe-2 font-semibold rounded"
          >
            +
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            increment();
          }}
          className="px-4 py-[0.4em] font-medium text-[0.9em] bg-pink-50 text-pink-dark rounded-md border border-pink-dark"
        >
          ADD
        </button>
      )}
    </div>
    }
    
    </>
  );
};

export default Addtocartbtn;
