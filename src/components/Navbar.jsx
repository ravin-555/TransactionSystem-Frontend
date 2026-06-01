
import { LogOut,BadgeDollarSignIcon } from "lucide-react";
import {Link} from "react-router-dom"

export default function Navbar({ timeLeft, onLogout }) {
    return (
        <div className=" sticky top-0 backdrop-blur-md flex justify-between items-center px-6 py-4 bg-white/10 border-b border-white/10 shadow-sm">

            <Link to="/" className="flex gap-1">
                <div className="flex h-8 w-10 items-center justify-center rounded-2xl  shadow-lg shadow-green-500/20">
                <BadgeDollarSignIcon className="h-5 w-5 text-green-500" />
            </div>
                <h1 className=" text-xl font-bold text-white">
                    Transaction Mate
                </h1>
            </Link>
            

            <div className="flex items-center gap-4">

                <p className="text-xs text-gray-500">
                    Session: {timeLeft}s
                </p>

                <button
                    onClick={onLogout}
                    className=" w-[95%] p-2  border border-white/20 rounded-xl cursor-pointer hover:bg-green-500/20 hover:border-white/40 transition text-sm flex items-center gap-1 text-white"
                >
                  <LogOut size={18} />Logout
                </button>
                

            </div>
        </div>
    );
}


  