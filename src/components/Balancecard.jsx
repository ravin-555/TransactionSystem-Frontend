// A card component to display user's balance and account information, with a toggle to show more details.
import { useState } from "react";
import Accounts from "./Accounts";
import Tooltip from "./Tooltip";
import { ChevronUp, ChevronDown } from 'lucide-react'
export default function BalanceCard({ userinfo }) {
    const [open, setOpen] = useState(false);
    const first6 = userinfo?.accountNumber?.slice(0, 6);


    return (
        <div className="bg-white/5 z-30  p-5  shadow-lg text-white ">

            <div className="flex justify-between items-start">

                {/* LEFT: Balance */}
                <div>
                    <p className=" text-xs text-green-500 opacity-80">
                        Available Balance
                    </p>

                    <h2 className="text-3xl text-green-500 font-bold mt-1">
                        ₹ {userinfo?.balance || 0}
                    </h2>
                </div>

                {/* RIGHT: Account Info */}
                    <Tooltip text="Account Info">

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-xl cursor-pointer hover:bg-white/20 transition"
                        >
                            <span className="text-sm">
                                Account
                            </span>

                            {
                                open
                                    ? <ChevronUp size={16} />
                                    : <ChevronDown size={16} />
                            }
                        </button>
                    </Tooltip>
                <div className="text-right  font-bold">

                    <p className="text-sm font-medium tracking-widest mt-2">
                        {first6 || "0000"} ****
                    </p>

                </div>

            </div>

            {/* Bottom Row (optional enhancement) */}
            <div className="mt-4 flex justify-between items-center  opacity-80 ">
                <div className="flex flex-col gap-1 ">
                    <span className=" font-bold text-2xl">{userinfo?.name || "User"}</span>
                </div>

                <span className=" font-bold text-sm">
                    {new Date().toLocaleDateString()}
                </span>

            </div>

            { open &&(
                <Accounts user={userinfo}/>
            )}

        </div>
    );
}


