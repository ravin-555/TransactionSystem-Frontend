
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import useTokenExpiry from "../hooks/useTokenExpiry"
import { jwtDecode } from "jwt-decode"
import api from "../api/axios"
import Navbar from "../components/Navbar";
import AmountModal from "../components/AmountModal"
import TransxAmtModal from "../components/TransxAmtModal"
import AdminAccess from "../hooks/Admin_acess"
import { logout } from "../api/auth"
import { Withdraw,Deposit, transfer } from "../api/transaction"

export default function DashboardLayout() {

  const [modal, setModal] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(0);
  const timeLeft = useTokenExpiry();

  const navigate = useNavigate();

  const refreshDashboard = () => {
    setRefreshFlag(prev => prev + 1); // toggle flag to trigger refresh in child components
  };

  const handleDeposit = async (amount) => {
    const res=Deposit(amount)
    setModal("")
  
  }
  const handleWithdraw = async (amount) => {
    const res = Withdraw(amount)
    setModal("")
  
  }
  const handleTransfer=async (data)=>{
console.log("handle transfer dashglayout :",data.amount,data.toUser);
    
    // transfer logic here
   const res=transfer({amount:data.amount,toUser:data.toUser})
console.log("transfer response :",res);
   
    setModal("")

  }

  useEffect(() => {
    refreshDashboard()

  }, [modal])
  

  const location = useLocation();
  // sync URL <-> modal state: open modal when route matches; close navigates back to /dashboard
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/transaction/deposit")) {
      setModal("deposit");
    } else if (path.endsWith("/transaction/withdraw")) {
      setModal("withdraw");
    } else if (path.endsWith("/transaction/transfer")) {
      setModal("transfer");
    } else if (path === "/dashboard") {
      setModal("");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-radial from-[#000000] to-[#012606]">

      {/* Navbar */}
      <Navbar
        timeLeft={timeLeft}
        onLogout={async () => {
          await logout();
          window.location.href = "/login";
        }}
      />

      {/* Page Content */}
      <Outlet
        context={{
          onDeposit: () => { setModal("deposit") },
          onWithdraw: () => { setModal("withdraw") },
          onTransfer: () => { setModal("transfer") },
          refreshFlag
        }}
      />
      {modal == "deposit" && (

        <AmountModal type="deposit" 
        onSubmit={handleDeposit}
        onClose={() => { setModal(""); }} />
      )}
      {modal == "withdraw" && (
        <AmountModal type="withdraw" 
        onSubmit={handleWithdraw}
        onClose={() => { setModal(""); }} />
      )}
      {modal == "transfer" && (
        <TransxAmtModal 
          type="transfer"
          onSubmit={handleTransfer}
          onClose={() => { setModal(""); }} />
      )}
      </div>

  );
}
