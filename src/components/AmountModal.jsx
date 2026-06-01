// A modal component for entering amount for deposit or withdraw
import { set } from "mongoose/lib/driver";
import { useState } from "react";


export default function AmountModal({ type, onSubmit, onClose }) {

    const [amount, setAmount] = useState("");
    const [error, setError] = useState("")
    const handlesubmit=()=>{
        setError("")
        const value=Number(amount)
        if(!value || value<=0){
            setError("Enter a valid amount")
            return;
        }
        try{
            onSubmit(value)
        }catch(err){
            setError(err)
        }
    }
    

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center  z-50">

            <div className="bg-white rounded-2xl p-6 w-80 shadow-xl animate-fadeIn">

                <h2 className="text-lg text-gray-500 font-semibold mb-4 capitalize">
                    {type}
                </h2>

                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full text-gray-600 border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-indigo-700 focus:outline-none"
                />

                <button
                    onClick={handlesubmit}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Confirm
                </button>

                <button
                    onClick={onClose}
                    className="mt-3 w-full text-sm text-gray-500"
                >
                    Cancel
                </button>

            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
  