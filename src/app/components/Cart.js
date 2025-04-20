"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, setCart } from "@/store/cartSlice";
import BungalowIcon from '@mui/icons-material/Bungalow';
import Login from "./Login";
import OrderStatus from "./OrderStatus";
import AddNewAddress from "./Addnewaddress";
import AddressComponent from "./AddressComponent";

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const [openorderStatus, setOpenorderstatus] = useState(false);
  // const savedAddress = localStorage.hasOwnProperty("savedAddress")?JSON.parse(localStorage.getItem("savedAddress")) : {};
  const [savedAddress, setSavedAddress] = useState({});
  const DeliveryCharge = 20;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAddr = localStorage.getItem("savedAddress");
      setSavedAddress(savedAddr ? JSON.parse(savedAddr) : {});
    }
  }, []);
  
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  //for delivery address
  const [DeliveryaddressOpen, setDeliveryaddressOpen] = useState(false);
  const handleOpen = () => setDeliveryaddressOpen(true);
  //for login state
  const [showLogin, setShowLogin] = useState(false);


  useEffect(() => {
    const loadState = () => {
      try {
        const serializedState = localStorage.hasOwnProperty("cartState")&&localStorage.getItem("cartState");
        if (serializedState !== null) {
          const state = JSON.parse(serializedState);
          dispatch(setCart(state));
        }
      } catch (err) {
        console.error("Could not load state", err);
      } finally {
        setIsHydrated(true);
      }
    };
    loadState();
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated) {
      const saveState = () => {
        try {
          const state = {
            items: cartItems,
            totalQuantity,
            totalAmount,
          };
          const serializedState = JSON.stringify(state);
          localStorage.setItem("cartState", serializedState);
        } catch (err) {
          console.error("Could not save state", err);
        }
      };
      saveState();
    }
  }, [cartItems, totalQuantity, totalAmount, isHydrated]);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  if (!isHydrated) {
    return <div></div>; // or any loading indicator you prefer
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



// check all conditions to place order
const onContinueCODClick=()=>{
  checkTokenCOD();
}  
const onContinueOnlineClick=()=>{
  checkToken();
}

const checkToken = () => {
  const storedToken = localStorage.hasOwnProperty("loginToken")&& localStorage.getItem("loginToken");
  if (storedToken) {
    //record address popup
    handleOpen();
  } else {
    // call login
    setShowLogin(true);
  }
};

const checkTokenCOD = () => {
  const storedToken = localStorage.hasOwnProperty("loginToken")&&localStorage.getItem("loginToken");
  const savedAddress = localStorage.hasOwnProperty("savedAddress")&&localStorage.getItem("savedAddress");

  if (savedAddress) {
    //call order status
    setOpenorderstatus(true);
    
  }else{
    handleOpen();
  }

  if (storedToken) {
    //record address popup
    // handleOpen();
  } else {
    // call login
    setShowLogin(true);
  }
};


// cancel order status modal
const handleCancel = () => {
  setOpen(false);
};



//cartState
const cartState = localStorage.hasOwnProperty("cartState")&&JSON.parse(localStorage.getItem('cartState')) || { items: [], totalQuantity: 0, totalAmount: 0 };

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
        <p
          className="text-lg font-semibold cursor-pointer"
          onClick={toggleDrawer(false)}
        >
          <CloseIcon />
        </p>
      </div>

      {cartItems?.length === 0 ? (
        <div className="mt-5 p-5 rounded-md text-center">
          <img
            src="/images/emptycart1.gif"
            alt="Empty Cart"
            className="w-32 mx-auto mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">
            Your Cart is Empty!
          </p>
          <p className="text-sm text-gray-500 my-2">
            Looks like you haven't added anything yet. Start shopping now!
          </p>
          <a
            href="/"
            className="bg-pink-dark hover:bg-purple-dark hover:text-white rounded-md px-4 py-2 my-3 text-sm font-semibold text-beige-light transition duration-200"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="mt-3 bg-white p-3 rounded-md">
            <div className="flex">
              <div className="self-center pe-3">
                <AccessTimeIcon className="h-8 w-8" />
              </div>
              <div className="self-center">
                <p className="font-bold text-md">Quickest Delivery</p>
                <p className="text-[0.80rem] font-normal text-gray-600">
                  Shipment of {totalQuantity} item{totalQuantity > 1 ? '(s)':''}
                </p>
              </div>
            </div>

            {cartItems?.map((item, index) => (
              <div key={index} className="flex justify-between my-5">
                <div className="h-[60px] w-[60px] p-1 border rounded-md">
                  <Image
                    src={item.image}
                    height={100}
                    width={100}
                    style={{ height: "100%", width: "100%" }}
                    alt="Product"
                  />  
                </div>
                <div className="flex-1 ps-3">
                  <p className="capitalize text-[0.80rem]">{item.name}</p>
                  <p className="text-sm font-semibold">
                    {item.quantity > 1 && (
                  <>
                    {item.quantity} items <span className="font-extralight text-gray-400">|</span>
                  </>
                )} ₹{parseInt(item.totalPrice)}
                  </p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-0">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                    className="px-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                  
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-white p-3 rounded-md">
            <p className="font-bold text-md">Bill Details</p>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Items Total</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Delivery Charge</p>
              <p>₹{DeliveryCharge}</p>
            </div>
            <div className="flex justify-between text-[0.85rem] text-normal">
              <p>Grand Total</p>
              <p>₹{totalAmount + DeliveryCharge}</p>
            </div>
          </div>

        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        <AddNewAddress open={DeliveryaddressOpen} setOpen={setDeliveryaddressOpen} handleOpen={handleOpen}/>
        <OrderStatus open={openorderStatus} setOpen={setOpenorderstatus} cartopen={setOpen} onCancel={handleCancel} totalPrice={50} orderStatus="processing" />

        {/* when address and login is captured */}
        <div className="mt-3 bg-white rounded-lg">
        {localStorage.getItem('savedAddress') && 
          <div className="flex gap-3 p-2 ps-3">
            <div className="self-start bg-gray-200 p-2 rounded-md text-gray-600">
            <BungalowIcon />
            </div>
            <div>
              <p onClick={()=>handleOpen()} className="cursor-pointer font-normal text-sm leading-tight">Delivering to <strong>{savedAddress.addressLabel}</strong> <ExpandMoreIcon/></p>
              <p className="text-gray-700 text-[13px] font-light leading-tight line-clamp-1 overflow-hidden ">{savedAddress.floor},{savedAddress.buildingName},{savedAddress.landmark}</p>
            </div>
          </div>
        }


       <div className="absolute bottom-0 left-0 right-0">
        <div className="flex flex-row items-center justify-between p-4 bg-purple-dark rounded-t-lg">
          {/* Left Side: Payment Info */}
          <div className="flex-1 md:text-left">
            <p className="text-beige-light text-[12px] leading-tight">To Pay</p>
            <p className="text-sm font-semibold text-beige-light leading-tight">₹{totalAmount + DeliveryCharge}</p>
          </div>

          {/* Right Side: Payment Options */}
          <div className="flex flex-col md:flex-row gap-2 md:mt-0">
            {/* <button onClick={()=>onContinueOnlineClick()} className="w-[90px] h-11 text-[13px] font-semibold text-white bg-pink-dark rounded-lg transition duration-300 text-center leading-tight">
              Pay Online <br />
              <span className="text-[11px] font-light">(UPI)</span>
            </button> */}
            <button onClick={()=>onContinueCODClick()} className="w-[110px] h-11 text-[13px] font-semibold text-white bg-pink-dark rounded-lg transition duration-300 text-center leading-tight">
              Pay Cash/UPI <br />
              <span className="text-[11px] font-light">(On delivery)</span>
            </button>
          </div>
        </div>
        </div>
        </div>

        </>
      )}
    </Box>
  );


  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="flex gap-2 items-center bg-pink-dark text-beige-light font-semibold rounded-lg px-2 py-1 text-sm ml-0 md:ml-4"
      >
        <LocalMallIcon />
        <div className="flex flex-col items-start">
          <span>{totalQuantity} items</span>
          <span>₹{totalAmount}</span>
        </div>
      </button>


    
      <AddressComponent/>
      <Drawer anchor="right" open={open}>
        {DrawerList}
      </Drawer>
    </>
  );
}
