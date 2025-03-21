"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, setCart } from "@/store/cartSlice";
import BungalowIcon from "@mui/icons-material/Bungalow";
import Login from "./Login";
import OrderStatus from "./OrderStatus";
import AddNewAddress from "./Addnewaddress";
import AddressComponent from "./AddressComponent";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [openorderStatus, setOpenorderstatus] = useState(false);
  const [savedAddress, setSavedAddress] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // For delivery address modal
  const [DeliveryaddressOpen, setDeliveryaddressOpen] = useState(false);
  const handleOpen = () => setDeliveryaddressOpen(true);
  // For login modal
  const [showLogin, setShowLogin] = useState(false);

  // Load cart state from localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const serializedState = localStorage.getItem("cartState");
        if (serializedState) {
          const state = JSON.parse(serializedState);
          dispatch(setCart(state));
        }

        // Load saved address
        const storedAddress = localStorage.getItem("savedAddress");
        if (storedAddress) {
          setSavedAddress(JSON.parse(storedAddress));
        }
      } catch (err) {
        console.error("Could not load state", err);
      } finally {
        setIsHydrated(true);
      }
    }
  }, [dispatch]);

  // Save cart state to localStorage
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        const state = { items: cartItems, totalQuantity, totalAmount };
        localStorage.setItem("cartState", JSON.stringify(state));
      } catch (err) {
        console.error("Could not save state", err);
      }
    }
  }, [cartItems, totalQuantity, totalAmount, isHydrated]);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Check all conditions to place order
  const onContinueCODClick = () => {
    checkTokenCOD();
  };
  const onContinueOnlineClick = () => {
    checkToken();
  };

  const checkToken = () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("loginToken");
      if (storedToken) {
        handleOpen();
      } else {
        setShowLogin(true);
      }
    }
  };

  const checkTokenCOD = () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("loginToken");
      const storedAddress = localStorage.getItem("savedAddress");

      if (storedAddress) {
        setOpenorderstatus(true);
      } else {
        handleOpen();
      }

      if (!storedToken) {
        setShowLogin(true);
      }
    }
  };

  // Cancel order status modal
  const handleCancel = () => {
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 300, md: 400 },
        height: "100vh",
        p: 2,
        position: "relative",
      }}
      className="bg-gray-100"
      role="presentation"
    >
      <div className="flex justify-between bg-white p-3 rounded-md">
        <p className="text-lg font-semibold">My Cart</p>
        <p className="text-lg font-semibold cursor-pointer" onClick={toggleDrawer(false)}>
          <CloseIcon />
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-5 p-5 rounded-md text-center">
          <img src="/images/emptycart1.gif" alt="Empty Cart" className="w-32 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Your Cart is Empty!</p>
          <p className="text-sm text-gray-500 my-2">Looks like you haven't added anything yet. Start shopping now!</p>
          <a href="/" className="bg-green-600 hover:bg-green-700 rounded-md px-4 py-2 my-3 text-sm font-semibold text-white transition duration-200">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="mt-3 bg-white p-3 rounded-md">
            <p className="font-bold text-md">Bill Details</p>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Items Total</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Delivery Charge</p>
              <p>₹15</p>
            </div>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Grand Total</p>
              <p>₹{totalAmount + 15}</p>
            </div>
          </div>

          <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
          <AddNewAddress open={DeliveryaddressOpen} setOpen={setDeliveryaddressOpen} handleOpen={handleOpen} />
          <OrderStatus open={openorderStatus} setOpen={setOpenorderstatus} cartopen={setOpen} onCancel={handleCancel} totalPrice={50} orderStatus="processing" />

          <div className="mt-3 bg-white rounded-lg">
            {savedAddress?.addressLabel && (
              <div className="flex gap-3 p-2 ps-3">
                <div className="self-start bg-gray-200 p-2 rounded-md text-gray-600">
                  <BungalowIcon />
                </div>
                <div>
                  <p onClick={handleOpen} className="cursor-pointer font-normal text-sm leading-tight">
                    Delivering to <strong>{savedAddress.addressLabel}</strong> <ExpandMoreIcon />
                  </p>
                  <p className="text-gray-700 text-[13px] font-light">{savedAddress.floor}, {savedAddress.buildingName}, {savedAddress.landmark}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white">
              <button onClick={onContinueCODClick} className="w-[110px] h-11 text-[13px] font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300">
                Pay Cash/UPI <br />
                <span className="text-[11px] font-light">(On delivery)</span>
              </button>
            </div>
          </div>
        </>
      )}
    </Box>
  );

  return (
    <>
      <button onClick={toggleDrawer(true)} className="flex gap-2 items-center bg-green-700 text-white font-semibold rounded-lg px-2 py-1 text-sm">
        <LocalMallIcon />
        <span>{totalQuantity} items</span>
      </button>
      <AddressComponent />
      <Drawer anchor="right" open={open}>
        {DrawerList}
      </Drawer>
    </>
  );
}
