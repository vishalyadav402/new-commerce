"use client"
import AccountLayout from '@/app/components/AccountLayout'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';

const page = () => {
const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const [orders, setOrders] = useState([]);

  // const LoginToken = localStorage.hasOwnProperty('loginToken')&& localStorage.getItem('loginToken');
  const [loginToken, setLoginToken] = useState(null);

  useEffect(() => {
    setLoginToken(localStorage.getItem("loginToken"));
  }, []);

  // order api fetch----------------
  useEffect(() => {
    const fetchOrders = async () => {
      if (!loginToken) return;
      try {
        const response = await axios.get("https://api.therashtriya.com/api/orders", {
          headers: { Authorization: `Bearer ${loginToken}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
// order------------------------
  return (
    <AccountLayout>
      <div>
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-white border rounded-md mb-4">
              <div className="flex justify-between items-center border-b cursor-pointer" onClick={()=>router.push('/account/order/'+ JSON.stringify(order))}>
                <div>
                  <div className="flex justify-start items-center gap-2 mb-2">
                    <Image src={"/images/userprofile_icon.png"} className="rounded-md" height={40} width={40} alt={"/images/userprofile_icon.png"} />
                    <Image src={"/images/userprofile_icon.png"} className="rounded-md" height={40} width={40} alt={"/images/userprofile_icon.png"}/>
                    <Image src={"/images/userprofile_icon.png"} className="rounded-md" height={40} width={40} alt={"/images/userprofile_icon.png"}/>
                  </div>
                  <p className="font-semibold text-[0.8em] text-gray-800">Order {order.status}</p>
                  <p className="text-gray-400 text-[0.8em]">Placed at {new Date(order.created_at).toLocaleString()}</p>
                  <p className="font-light text-[0.8em] text-gray-400">Payment Method ({order.payment_method})</p>
                </div>
                <div className='flex flex-col'>
                <p onClick={()=>router.push('/account/order/order-details')} className="text-[0.9em] text-right leading-[0.9em] font-semibold">₹ {order.total_amount}</p>
                <button className='flex mt-2 bg-green-100 text-green-700 rounded-sm ps-2 py-0 self-center font-semibold text-[0.8em]'>View Order<NavigateNextIcon/></button>
                </div>
              </div>
              <div className='text-center mt-2'>
              <button className="text-red-500 font-semibold my-1 text-[0.8em]">Order Again</button>
              </div>
            </div>
          ))}
        </div>
    </AccountLayout>
  )
}

export default page