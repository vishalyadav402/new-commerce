"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ClientLayout from "../ClientLayout";
import { LocalMall, SupportAgent, Home, Person, Logout} from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import axios from "axios";
import Login from "./Login";
import { useParams } from "next/navigation";


const Menu = ({ activeSection, setActiveSection, refresh }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { name: "Profile", icon: <Person />, route: "/account/profile" },
    { name: "Addresses", icon: <Home />, route: "/account/addresses" },
    { name: "Orders", icon: <LocalMall />, route: "/account/order" },
    { name: "Customer Support", icon: <SupportAgent />, route: "/account/support"},
    { name: "Log Out", icon: <Logout /> },
  ];

  const handleMenuClick = (item) => {
    if (item.name === "Log Out") {
      localStorage.removeItem("loginToken");
      location.reload(); // or set a state to trigger login modal
      return;
    }
  
    setActiveSection(item.name);
    if (item.route) {
      router.push(item.route);
      setLoading(false);
    }
  };

  // get profile data
  useEffect(() => {
    fetchProfileData();
  }, [refresh]);

  const [userData, setUserData] = useState([])
  const fetchProfileData = async () => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    try {
      const response = await axios.get("https://api.therashtriya.com/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data)
      setUserData(response.data);
     
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="md:w-1/3 w-full border-r bg-white">
      <div className="flex items-center space-x-4 p-4 border-b mb-1">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center">
          <Image src={"/images/userprofile_icon.png"} className="rounded-full" height={40} width={40} alt="image"/>
        </div>
        <div>
          <h3 className="font-semibold text-md leading-none">Welcome, {(userData.name || "User").slice(0, 20)}</h3>
          <p className="text-gray-400 text-[0.9em]">{userData.phone}</p>
        </div>
      </div>
      {menuItems
  .filter((item) => item.name !== "Orders-deta")
  .map((item) => (
    <button
      key={item.name}
      onClick={() => handleMenuClick(item)}
      className={`flex items-center space-x-3 w-full text-[0.9em] text-left p-4 border-b transition ${
        activeSection === item.name ? "bg-gray-300" : ""
      }`}
    >
      {item.icon} <span>{item.name}</span>
    </button>
))}
    </div>
  );
};




const AccountLayout = ({ children, refresh, loading}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("Profile");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      setShowLogin(true);
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/account/profile")) {
      setActiveSection("Profile");
    } else if (pathname.startsWith("/account/addresses")) {
      setActiveSection("Addresses");
    } else if (pathname.startsWith("/account/order")) {
      setActiveSection("Orders");
    } else if (pathname.startsWith("/account/support")) {
      setActiveSection("Customer Support");
    }
  }, [pathname]);


// Inside your component:
const params = useParams();
const paramKey = Object.keys(params)[0]; // returns 'order-details'
const displayTitle = paramKey === "order-details" ? paramKey : activeSection;

  return (
    <ClientLayout>
      <div className="container mx-auto p-4 mt-5 md:px-[8rem] lg:px-[14rem] min-h-screen">
        <div className="flex flex-col md:flex-row border rounded-md">
          {/* Sidebar */}
          <Menu activeSection={activeSection} setActiveSection={setActiveSection} refresh={refresh}/>

          {/* Main Content */}
          <div className="md:w-3/4 w-full bg-gray-50">
          <div onClick={() => router.back()} className="bg-white capitalize cursor-pointer border-b p-2 font-semibold flex items-center">
            <ArrowBackIosIcon />
            {displayTitle}
          </div>

            <div className="min-h-screen p-4 max-h-screen overflow-y-auto">{children || "Loading..."}</div>
          </div>
        </div>
      </div>

      {/* Show Login Modal if not authenticated */}
      <Login isOpen={showLogin} onClose={() => setShowLogin(true)} />

    </ClientLayout>
  );
};

export default AccountLayout;
