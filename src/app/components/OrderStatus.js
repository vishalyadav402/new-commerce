import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, CircularProgress, Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";

const OrderStatus = ({ open, setOpen, cartopen, onCancel, totalPrice, cartItems = [] }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const LoginToken = localStorage.getItem("loginToken");

  useEffect(() => {
    if (open && !cancelled) {
      setLoading(true);
      placeOrder();
    }
  }, [open, cancelled]);

  const placeOrder = async () => {
    // if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    //   console.error("cartItems is undefined or empty.");
    //   Swal.fire({
    //     icon: "error",
    //     title: "Cart is Empty",
    //     text: "Please add items to your cart before placing an order.",
    //   });
    //   setLoading(false);
    //   setOpen(false);
    //   return;
    // }
    const LoginToken = localStorage.getItem('loginToken');

//cartState
const cartState = JSON.parse(localStorage.getItem('cartState')) || { items: [], totalQuantity: 0, totalAmount: 0 };
// {"items":[{"id":22,"price":"20.00","quantity":1,"totalPrice":"20.00","name":"Lay's West Indies Hot n Sweet Chilli Flavour Potato Chips","image":"https://api.therashtriya.com/uploads/1737190481539.avif"}],"totalQuantity":1,"totalAmount":"020.00"}
toast.success(JSON.stringify(cartState.totalAmount))   
try {
      const data = {
        total_amount: cartState.totalAmount,
        payment_method: "POD",
        items: cartState.items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price), // Convert price to number
        })),
      };
      const response = await axios.post(
        "https://api.therashtriya.com/api/orders",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LoginToken}`,
          },
        }
      );

      setLoading(false);
      handleSuccess(response.data);
    } catch (error) {
      toast.error("Order placement error:"+ error);
      setLoading(false);
      handleError(error);
    }
  };

  const handleSuccess = (data) => {
    setOpen(false);
    cartopen(false);
    dispatch(emptyCart());
    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been placed successfully.",
    });
  };

  const handleError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text: error.response?.data?.message || "Something went wrong!",
    });
  };

  const handleCancel = () => {
    setOpen(false);
    cartopen(false);
    setCancelled(true);
    Swal.fire({
      icon: "error",
      title: "Order Cancelled",
      text: "Your order has been cancelled successfully.",
    }).then(() => onCancel());
  };

  return (
    <Modal open={open} onClose={onCancel}>
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center mx-auto mt-40">
        <Typography variant="h6" className="font-bold mb-2">
          Order Total: Rs.{totalPrice}
        </Typography>
        {loading ? (
          <>
            <CircularProgress className="my-4" />
            <Typography className="mb-4 text-gray-600">
              Placing your order...
            </Typography>
          </>
        ) : !cancelled && (
          <Typography className="mb-4 text-green-600">
            Order placed successfully!
          </Typography>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={handleCancel}
          className="w-full"
        >
          Cancel Order
        </Button>
      </div>
    </Modal>
  );
};

export default OrderStatus;
