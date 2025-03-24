"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ClientLayout from "../ClientLayout";
import { LocalMall, SupportAgent, Home, Person, Logout } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import axios from "axios";

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
          <h3 className="font-semibold text-md">{userData.name || "User"}</h3>
          <p className="text-gray-400 text-[0.9em]">{userData.phone}</p>
        </div>
      </div>
      {menuItems.map((item) => (
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

  useEffect(() => {
    // Map path to section name dynamically
    const sectionMap = {
      "/account/profile": "Profile",
      "/account/addresses": "Addresses",
      "/account/order": "Orders",
      "/account/order/order-details": "Order-Details",
      "/account/support": "Support",

    };

    // Update activeSection based on current path
    if (sectionMap[pathname]) {
      setActiveSection(sectionMap[pathname]);
    }
  }, [pathname]);

  return (
    <ClientLayout>
      <div className="container mx-auto p-4 mt-5 md:px-[8rem] lg:px-[14rem] min-h-screen">
        <div className="flex flex-col md:flex-row border rounded-md">
          {/* Sidebar */}
          <Menu activeSection={activeSection} setActiveSection={setActiveSection} refresh={refresh}/>

          {/* Main Content */}
          <div className="md:w-3/4 w-full bg-gray-50">
            <div onClick={() => router.back()} className="bg-white cursor-pointer border-b p-2 font-semibold flex items-center">
              <ArrowBackIosIcon /> {activeSection}
            </div>
            <div className="min-h-screen p-4 max-h-screen overflow-y-auto">{children || "loading"}</div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default AccountLayout;
