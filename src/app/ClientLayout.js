import Master from "@/app/components/Master";
import ReduxProvider from "./components/ReduxProvider";

export const metadata = {
  title: "Order Kirana items Online from Town's Best Kirana Delivery Service | VishCart",
  description: "Order Kirana Items Online",
  keyword:"kirana store, Online Shopping, online grocery delivery, online delivery app, Instant Grocery Delivery, Online Kirana Shopping, Quick Grocery Delivery, Grocery Delivery App, Same-Day Grocery Delivery, Home Delivery Service, Order Online, Daily Essentials Delivery, Nearby Grocery Delivery, "
};

export default function ClientLayout({ children }) {
  return (
      <ReduxProvider>
        <Master>
          {children}
        </Master>
      </ReduxProvider>
  );
}
