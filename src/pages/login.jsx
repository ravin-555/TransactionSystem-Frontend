import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
  // react-hook-form setup
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  // Extra UI-level spam prevention (cooldown)
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState(null);
  const [showpassword, setShowPassword] = useState(false)

  // Initial State: Compute remaining seconds from localStorage immediately on load
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const expiryTime = localStorage.getItem('api_rate_limit_expiry');
    if (expiryTime) {
      const remaining = Math.ceil((Number(expiryTime) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return 0;
  });

  const timerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('rate-limit', (event) => {
      const incomingSeconds = Number(event.detail.seconds);

      // to Calculate the exact Unix timestamp when the limit resets
      const expiryTimestamp = Date.now() + (incomingSeconds * 1000);

      // Saving it to localStorage so it survives a page refresh
      localStorage.setItem('api_rate_limit_expiry', expiryTimestamp.toString());

      if (timerRef.current) clearInterval(timerRef.current);
      setSecondsLeft(incomingSeconds);
    })

    return () => {
      window.removeEventListener('rate-limit', (event) => {
        setSecondsLeft(event.detail.seconds);
      });
    }
  }, [])


  // Countdown timer logic
  useEffect(() => {
    if (secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
        setError(`Too many attempts. Please wait ${secondsLeft} seconds`);
      }, 1000);
    } else if (secondsLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      localStorage.removeItem('api_rate_limit_expiry'); // Clear expiry from localStorage when 
      setError(null) // Clear error message when cooldown ends
      setCooldown(false); // Reset cooldown state
    }
    return () => clearInterval(timerRef.current);
  }, [secondsLeft]);

  // Submit handler
  const onSubmit = async (data) => {
    if (cooldown) return; //prevent multiple submits during cooldown

    setCooldown(true);

    //api call to post data
    try {
      const result = await login(data);


      // store jwt token in local storage 
      localStorage.setItem("token", result?.token)

      navigate("/admin/dashboard", { replace: true }); // Redirect to admin dashboard after successful login , 
      // it will be further redirected to user dashboard if not admin by AdminRoutes component

      // reset form
      reset();
    } catch (error) {
      if (error.response) {
console.log("Error response:", error.response);
        setError(error.response.data?.error?.message || "login Failed");
      }
    }
    // Cooldown reset after request delay 
    setCooldown(false)

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#18042c]">
      <div className="w-full max-w-sm border border-white/10 bg-white/5 rounded-xl p-6 shadow-lg">

        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-6">
          Login to Account
        </h1>
        {error && (
          <div className="bg-(--danger-light) text-(--danger) p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Account Number */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Account Number
            </label>
            <input
              name="accountNumber"
              type="text"
              placeholder="Enter account number"
              autoComplete="username"
              className="w-full px-3 py-2 rounded-md bg-bg border border-(--border)
                         focus:outline-none focus:ring-2 focus:ring-(--primary)"
              {...register("accountNumber", {
                required: "Account number is required",
                minLength: {

                  value: 6,
                  message: "Account number must be longer than 5 characters"
                }
              })}
            />
            {errors.accountNumber && (
              <p className="text-(--danger) text-sm mt-1">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type={showpassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-md bg-bg border border-(--border)
                         focus:outline-none focus:ring-2 focus:ring-(--primary)"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />

            <button className=" absolute right-2 bottom-3 cursor-pointer"
              onClick={(e) => {
                setShowPassword((prev) => !prev)
                e.preventDefault()
              }}
            >
              {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-(--danger) text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || cooldown || secondsLeft > 0}
            className="w-full bg-linear-to-r from-[#2701478d] to-[#5e03a4] py-2 rounded-md font-medium cursor-pointer
                       hover:opacity-80 transition disabled:opacity-50"
          >
            {cooldown ? "Please wait..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}
