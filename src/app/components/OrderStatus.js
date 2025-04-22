import { useEffect, useState } from "react";
import axios from "axios";
import { Modal} from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
import { CheckCircle } from "@mui/icons-material";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";

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

//cartState
const cartState = JSON.parse(localStorage.getItem('cartState')) || { items: [], totalQuantity: 0, totalAmount: 0 };
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

  const orderDate = new Date().toISOString(); // Capture once at order placement
  const formattedDateTime = format(new Date(orderDate), "PPpp");
  const paymentStatus = "upi" ;
  

  const getPaymentStatusLabel = () => {
    if (paymentStatus === "upi") {
      return (
        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          Paid via UPI
        </span>
      );
    }
    return (
      <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
        Pending (Cash on Delivery)
      </span>
    );
  };


  return (
    <Modal open={false} onClose={onCancel}>
      <div className="bg-green-50 border relative border-green-300 rounded-2xl p-6 shadow-md max-w-md mx-auto mt-40">
<div onClick={()=>onCancel()} className="absolute top-3 right-3 text-pink-dark text-3xl"><CloseIcon/></div>
        {loading ? (
          <>
            <div className="p-6 text-center max-w-md mx-auto animate-pulse">
              <div className="flex justify-center mb-4">
                <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Processing your order...</h2>
              <p className="text-sm text-gray-600">
                Hang tight! We’re confirming your items and getting things ready.
              </p>
            </div>
          </>
        ) : !cancelled && (
          <>
           <div className="flex items-center space-x-3 mb-4">
        <CheckCircle className="text-green-600" />
        <h2 className="text-green-800 text-xl font-semibold">Order Confirmed!</h2>
      </div>
      <p className="text-green-700 mb-2">We've received your order and it's being processed.</p>
      
      <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm mb-4">
        <p className="text-sm text-gray-600">Order ID:</p>
        <p className="text-md font-medium text-gray-800">#000000</p>

        <p className="text-sm text-gray-600 mt-2">Date & Time:</p>
        <p className="text-md font-medium text-gray-800">{formattedDateTime}</p>

        <p className="text-sm text-gray-600 mt-2">Payment Status:</p>
        <div className="mt-1">{getPaymentStatusLabel()}</div>

    {paymentStatus === !"upi"&&
     <>
        <p className="text-sm text-gray-600 mt-2">Payment Need To Pay:</p>
        <div className="mt-1">{totalPrice}</div>
        </>}
      </div>

      <p className="text-sm text-green-700">
        You'll receive a confirmation message shortly with delivery updates. Thank you for shopping with us!
      </p></>
        )}

       {!cancelled && <div className="flex justify-between my-4">
          <button
            onClick={handleCancel}
            className="bg-pink-dark text-sm rounded-md p-2 text-beige-light"
            >
            Cancel Order
          </button>
        </div>}
      </div>
    </Modal>
  );
};

export default OrderStatus;
