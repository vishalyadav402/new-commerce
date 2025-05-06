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
  }, [loginToken]);
// order------------------------
  return (
    <AccountLayout>
      <div>
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-white border rounded-md mb-4">
              {/* <p className='text-[0.5em]'>{JSON.stringify(order)}</p> */}
              <div className="cursor-pointer" onClick={()=>router.push('/account/order/'+ JSON.stringify(order.order_id))}>
                <div className="flex flex-wrap justify-start items-start gap-2 mb-2 w-full">
                    {order.items.map((item) => (
                      <div key={item.order_item_id} className='h-12 w-12 border rounded-md flex-shrink-0'>
                        <Image src={"https://api.therashtriya.com"+item.ProductImage} alt={item.ProductName} className="rounded-md object-contain" style={{height:'45px',width:'45px'}} height={100} width={100} />
                      </div>
                        ))}
                </div>
                <div className='flex justify-between w-full'>
                  <div>
                    <p className="font-semibold text-[0.8em] capitalize text-gray-800">Order {order.status}</p>
                    <p className="text-gray-400 text-[0.8em]">Placed at : {new Date(order.created_at).toLocaleString()}</p>
                    <p className="font-light text-[0.8em] text-gray-400">Payment Method : ({order.payment_method})</p>
                  </div>
                  
                  <div>
                  <p onClick={()=>router.push('/account/order/order-details')} className="text-[0.9em] text-right leading-[0.9em] font-semibold">₹ {order.total_amount}</p>
                  <button className='flex mt-2 bg-green-100 text-green-700 rounded-md min-w-[102px] ps-2 py-0 self-center font-semibold text-[0.8em]'>View Order<NavigateNextIcon/></button>
                  </div>
                </div>
              </div>
              {/* <div className='text-center mt-2'>
              <button className="text-red-500 font-semibold my-1 text-[0.8em]">Order Again</button>
              </div> */}
            </div>
          ))}
        </div>
    </AccountLayout>
  )
}

export default page