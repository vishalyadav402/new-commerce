import { useEffect } from "react";
import axios from "axios";

const fetchAndStoreAddress = async () => {
    const LoginToken = localStorage.hasOwnProperty('loginToken')&&localStorage.getItem('loginToken');
  try {
    const response = await axios.get("https://api.therashtriya.com/user/delivery-address", {
      headers: {
        Authorization: `Bearer ${LoginToken}`,
      },
    });

    if (response.data.length > 0) {
      const latestAddress = response.data[response.data.length - 1];

      const formattedAddress = {
        buildingName: latestAddress.society_name,
        floor: latestAddress.house_no,
        landmark: latestAddress.landmark,
        addressLabel: latestAddress.delivery_type,
        receiverName: latestAddress.receiver_name,
        mobileNumber: latestAddress.mobile_no,
      };

      localStorage.setItem("savedAddress", JSON.stringify(formattedAddress));
      console.log("Address saved:", formattedAddress);
    }
    else{
        localStorage.setItem("savedAddress", JSON.stringify({}))
    }
  } catch (error) {
    alert("Error fetching address:"+ error);
  }
};

const AddressComponent = () => {
  useEffect(() => {
    fetchAndStoreAddress();
  }, []);

  return <></>;
};

export default AddressComponent;
