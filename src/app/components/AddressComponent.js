import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const fetchAndStoreAddress = async () => {
  const loginToken = localStorage.getItem('loginToken') || null;
  if (!loginToken) {
    // alert("User is not logged in. Please log in first.");
    return;
  }

  try {
    const response = await axios.get("https://api.therashtriya.com/user/delivery-address", {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const latestAddress = response.data[response.data.length - 1];

      const formattedAddress = {
        buildingName: latestAddress.society_name || "",
        floor: latestAddress.house_no || "",
        landmark: latestAddress.landmark || "",
        addressLabel: latestAddress.delivery_type || "",
        receiverName: latestAddress.receiver_name || "",
        mobileNumber: latestAddress.mobile_no || "",
      };

      localStorage.setItem("savedAddress", JSON.stringify(formattedAddress));
      // console.log("Address saved:", formattedAddress);
    } else {
      localStorage.setItem("savedAddress", JSON.stringify({}));
      toast.error("No addresses found.");
    }
  } catch (error) {
    console.error("Error fetching address:", error.response?.data || error.message);
    toast.error(`Error fetching address: ${error.response?.data?.message || error.message}`);
  }
};


const AddressComponent = () => {
  useEffect(() => {
    fetchAndStoreAddress();
  }, []);

  return <></>;
};

export default AddressComponent;
