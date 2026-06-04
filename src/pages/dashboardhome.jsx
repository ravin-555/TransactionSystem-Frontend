
import { use, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { getuserdata, gettransactions } from "../api/user"
import Balancecard from "../components/Balancecard"
import QuickActions from "../components/QuickActions"
import TransactionList from "../components/TransactionList"
import Loader from "../components/Loader"
import Footer from "../components/Footer"

export default function DashboardHome() {

    const { onDeposit, onWithdraw, onTransfer ,refreshFlag} = useOutletContext();
    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const token=localStorage.getItem("token")

    const loadDashboard = async () => {
        try {
            const userdata = await getuserdata();
            if(userdata.role === "admin"){
                navigate("/admin/dashboard", { replace: true });
                return;
            }

            const tx = await gettransactions();

            setUserinfo(userdata);
            setTransactions(tx);

        } catch (err) {
            setError("Failed to load dashboard");
        }
    };

    useEffect(() => {
        loadDashboard();
    }, [refreshFlag,token]); // also reload when token changes (e.g. after refresh)


    return (
        <div className="space-y-6">

            {/* Balance Section */}
            <section>
                <Balancecard userinfo={userinfo} />
            </section>

            {/* Quick Actions Section */}
            <section className="mt-8 pt-8 pb-16 bg-white/5 p-4 rounded-2xl shadow-sm border-b-5 border-[#a2ffe9]/50">

                <h3 className="text-lg font-bold text-green-500 mb-5">
                    Quick Actions
                </h3>

                <QuickActions
                    onDeposit={onDeposit}
                    onWithdraw={onWithdraw}
                    onTransfer={onTransfer}
                />

            </section>


            {/* Transactions Section */}
            <section>
                <TransactionList transactions={transactions} />
            </section>
            {/* footer */}
            <Footer/>
        </div>
    )
}
