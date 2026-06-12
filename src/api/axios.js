import axios from "axios";
import { toast } from "react-toastify";

// Main API instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// ======================
// REQUEST INTERCEPTOR
// ======================

api.interceptors.request.use(
    (config) => {
        try {
            window.dispatchEvent(
                new CustomEvent("global-loading", {
                    detail: { type: "start" },
                })
            );
        } catch { }

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ======================
// RESPONSE INTERCEPTOR
// ======================

api.interceptors.response.use(
    (response) => {
        try {
            window.dispatchEvent(
                new CustomEvent("global-loading", {
                    detail: { type: "stop" },
                })
            );
        } catch { }

        return response;
    },

    async (error) => {
        try {
            window.dispatchEvent(
                new CustomEvent("global-loading", {
                    detail: { type: "stop" },
                })
            );
        } catch { }

        const originalRequest = error.config;

        // Network errors
        if (!error.response) {
            toast.error(
                "Network error. Please check your internet connection."
            );
            return Promise.reject(error);
        }

        const { status, data } = error.response;

        const errorMessage =
            data?.error?.message ||
            data?.message ||
            data?.error ||
            "Something went wrong";

        // ======================
        // TOKEN REFRESH LOGIC
        // ======================

        const isRefreshRequest =
            originalRequest?.url?.includes("/auth/refresh");

        const isLoginOrRegister =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/register");

        if (
            status === 401 &&
            !originalRequest?._retry &&
            !isRefreshRequest &&
            !isLoginOrRegister
        ) {
            originalRequest._retry = true;

            try {
                console.log(
                    "Axios: Attempting token refresh..."
                );

                const refreshResponse = await axios.post(
                    import.meta.env.VITE_REFRESH_TOKEN_URL,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const newToken =
                    refreshResponse.data.token;

                localStorage.setItem(
                    "token",
                    newToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.log(
                    "Axios: Refresh token failed."
                );

                localStorage.removeItem("token");

                toast.error(
                    "Session expired. Please log in again."
                );

                window.location.replace("/login");

                return Promise.reject(refreshError);
            }
        }

        // ======================
        // ERROR HANDLING
        // ======================

        switch (status) {
            case 400:
                toast.error(errorMessage);
                break;

            case 401:
                toast.error(errorMessage);
                break;

            case 403:
                toast.error(
                    errorMessage ||
                    "Permission denied."
                );
                break;

            case 404:
                toast.error(
                    errorMessage ||
                    "Resource not found."
                );
                break;

            case 429: {
                toast.error(
                    errorMessage ||
                    "Too many requests. Please try again later."
                );

                const retryAfterSeconds =
                    Number(
                        error.response.headers[
                        "ratelimit-reset"
                        ]
                    ) || 30;

                window.dispatchEvent(
                    new CustomEvent("rate-limit", {
                        detail: {
                            seconds: retryAfterSeconds,
                        },
                    })
                );

                break;
            }

            case 500:
                toast.error(
                    errorMessage ||
                    "Internal server error."
                );
                break;

            default:
                toast.error(
                    errorMessage ||
                    `Error ${status}`
                );
        }

        return Promise.reject(error);
    }
);

export default api;