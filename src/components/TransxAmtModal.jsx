
import { useState } from "react";

export default function TransxAmtModal({ type, onSubmit, onClose }) {

    const [amount, setAmount] = useState("");
    const [recp_acc, setRecp_acc] = useState("");
    const [error, seterror] = useState("")
    const handlesubmit=()=>{
        seterror("")
        const value=Number(amount);
        const toUser=recp_acc.trim();
        if(!value || value <= 0){
            seterror("Enter a valid amount");
            return;
        }
        if(!toUser){
            seterror("Enter recipient account number");
            return;
        }
        try{

            onSubmit({ amount: value, toUser })
        }catch(err){
            seterror(err);
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
                <input
                    value={recp_acc}
                    onChange={(e) => setRecp_acc(e.target.value)}
                    placeholder="Enter recipient account number"
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
  