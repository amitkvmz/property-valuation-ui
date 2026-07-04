import { useEffect } from "react";
import axios from "axios";

function Heartbeat() {
  useEffect(() => {
    // Define the function that will call your backend
    const sendPing = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // if you need auth
        const response = await axios.get(
          "https://property-valuation-api-9w80.onrender.com",
          {
            /* headers: {
              Authorization: `Bearer ${token}`, // include JWT if required
            }, */
          }
        );
        console.log("Ping success:", response.data);
      } catch (err) {
        console.error("Ping failed:", err);
      }
    };

    // Call immediately once
    sendPing();

    // Set up interval every 5 minutes (300000 ms)
    const intervalId = setInterval(sendPing, 300000);

    // Cleanup when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component doesn’t render anything
}

export default Heartbeat;
