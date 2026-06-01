import axios from "axios";
import { toast } from "react-toastify";
// centralized axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true // to include cookies in requests for token refresh
});

// Add a request interceptor to include JWT token to req headers and emit global loading events
api.interceptors.request.use((config) => {
    // signal start (safe for non-browser envs)
    try { window.dispatchEvent(new CustomEvent('global-loading', { detail: { type: 'start' } })); } catch (e) { }
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// Add a response interceptor to handle unauthorized responses globally and emit loading stop events

api.interceptors.response.use(
    (response) => {
        try { window.dispatchEvent(new CustomEvent('global-loading', { detail: { type: 'stop' } })); } catch (e) { }
        return response;
    },
    async (error) => {
        try { window.dispatchEvent(new CustomEvent('global-loading', { detail: { type: 'stop' } })); } catch (e) { }

        const { response } = error;
        if (!response) {
            toast.error("Network error: Please check your internet connection.");
            return Promise.reject(error);
        }

        const originalRequest = error?.config;
        const { data, status } = error?.response;
        const errorMessage = data?.message;

        // Check if haven't tried retrying yet
        if (!originalRequest._retry) {
            // finally mark the request as having been retried to prevent infinite loops
            originalRequest._retry = true;
            switch (status) {
                case 401:
                    // Authentication error, try refreshing token
                    try {
console.log("Axios: Attempting token refresh due to 401 response...");
                        const res = await axios.post(
                            import.meta.env.VITE_REFRESH_TOKEN_URL,
                            {},
                            { withCredentials: true }
                        );

                        const newToken = res.data.token;

                        localStorage.setItem("token", newToken);

                        originalRequest.headers.Authorization =
                            `Bearer ${newToken}`;

                        return api(originalRequest); // Retry the original request with new token

                    } catch (refreshError) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                        toast.error("Session expired. Please log in again.");
                        break;

                    }
                case 403:
                    // Authorization error
                    toast.error(errorMessage || "PERMISSION DENIED: You don't have permission to perform this action.");
                    break;
                
                case 429:
                    // Too many requests
                    toast.error(errorMessage || "TOO MANY REQUESTS:  Please try again later.");
                    const retryafterseconds = Number(error.response.headers['ratelimit-reset']) || 30; // Default to 30 seconds if not provided

                    // globally dispatch
                    const event = new CustomEvent('rate-limit', {
                        detail: { seconds: retryafterseconds }
                    });
                    window.dispatchEvent(event);
                
                    
                case 500:
                    // Server error
                    toast.error(errorMessage || "SERVER ERROR: An unexpected error occurred on the server.");
                    break;

                default:
                    // Other errors
                    toast.error(errorMessage || `ERROR: ${status} ${error.response.statusText}`);
            }

        }
        return Promise.reject(error); // Reject the error to allow individual request handlers to handle it as well
    });

export default api
