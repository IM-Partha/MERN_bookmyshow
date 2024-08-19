import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080";

/////////////// For Booking///////////////////////////////
export const HandelCreate = async (obj) => {
  const URL = `${API_URL}/api/booking`;

  try {
    const response = await axios.post(URL, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response.data.message || "Booking Successful");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Booking Failed";
    toast.error(errorMessage);
  }
};

//////////////////////// For Booking History///////////////////

export const HandelGateData = async () => {
  const URL = `${API_URL}/api/booking`;
  try {
    const response = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Access error message correctly
    const errorMessage = error.response?.data?.message || "Internal Problem";
    toast.error("Internal Problem: " + errorMessage);
    console.error(`Internal Problem: ${errorMessage}`);
    return null;
  }
};
