import ReduxProvider from "./components/ReduxProvider";
import Master2 from "./components/Master2";
import { useState } from "react";

export const metadata = {
  title: "Order Kirana items Online from Town's Best Kirana Delivery Service | VishCart",
  description: "Order Kirana Items Online",
  keyword:"kirana store, Online Shopping, online grocery delivery, online delivery app, Instant Grocery Delivery, Online Kirana Shopping, Quick Grocery Delivery, Grocery Delivery App, Same-Day Grocery Delivery, Home Delivery Service, Order Online, Daily Essentials Delivery, Nearby Grocery Delivery, "
};

export default function ClientLayout2({ children,title ,setTitle}) {
  
  return (
      <ReduxProvider>
        <Master2 setsearchField={setTitle}>
          {children}
          </Master2>
      </ReduxProvider>
  );
}
