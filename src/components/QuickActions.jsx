
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function QuickActions({ onDeposit, onWithdraw, onTransfer }) {

    const actions = [
        {
            label: "Deposit",
            icon: <ArrowDownCircle size={22} />,
            action: onDeposit,
            color: "bg-green-100 text-green-600"
        },
        {
            label: "Withdraw",
            icon: <ArrowUpCircle size={22} />,
            action: onWithdraw,
            color: "bg-red-100 text-red-600"
        },
        {
            label: "Transfer",
            icon: <Send size={22} />,
            action: onTransfer,
            color: "bg-indigo-100 text-indigo-600"
        }
    ];

    return (
        <div className=" pt-8 grid grid-cols-3 gap-4 mb-2">

            {actions.map((item, index) => (
                <button
                    key={index}
                    onClick={item.action}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl bg-green-300 cursor-pointer hover:bg-green-400 transition shadow-sm`}
                >

                    <div className={`p-3 rounded-full mb-2 ${item.color}`}>
                        {item.icon}
                    </div>

                    <span className="text-sm font-bold text-gray-700">
                        {item.label}
                    </span>

                </button>
            ))}

        </div>
    );
}
