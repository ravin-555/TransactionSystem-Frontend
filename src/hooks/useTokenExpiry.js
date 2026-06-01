import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

export default function useTokenExpiry() {

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {

        const interval = setInterval(async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setTimeLeft(null);
                return;
            }

            try {

                const decoded = jwtDecode(token);

                const remaining =Math.floor((decoded.exp * 1000 - Date.now()) / 1000);

                setTimeLeft(remaining > 0 ? remaining : 0);

                // // refresh when less than 30 seconds remaining
                // if (remaining < 30) {

                //     const res = await api.post("/auth/refresh");

                //     localStorage.setItem("token", res.data.token);

                // }

            }
            catch (err) {
console.log("Token decode error", err);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return timeLeft;

}
