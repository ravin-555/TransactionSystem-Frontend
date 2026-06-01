
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardHome from './pages/dashboardhome'
import DashboardLayout from './pages/dashboardLayout'
import ProtectedRoutes from './routes/protectedRoutes'
import PublicRoutes from './routes/publicRoutes'
import AmountModal from './components/AmountModal'
import TransxAmtModal from './components/TransxAmtModal'
import Tsx_detail from './pages/Tsx_detail'
import AdminRoutes from './routes/AdminRoutes'
import AdminPanel from './pages/AdminPanel'
import LandingPage from './pages/LandingPage'
import Accounts from './components/Accounts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (

    <BrowserRouter>

      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoutes> <Login /> </PublicRoutes>}/>
        <Route path="/register" element={<Register />} />

        {/* Protected  : dashboard layout with nested child routes */}
        <Route path="/dashboard" element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes> }>
              {/* Dashboard home */}
             <Route index element={<DashboardHome />} />

        </Route>

        <Route path="transactions/deposit" element={<AmountModal />} />
        <Route path="transactions/withdraw" element={<AmountModal />} />
        <Route path='transactions/transfer' element={<TransxAmtModal />} />
        <Route path="transactions/details/:tsx_id" element={<Tsx_detail />} />

        {/* Admin routes*/}
        <Route path="/admin/dashboard" element={<AdminRoutes> <AdminPanel /> </AdminRoutes>} />
      {/* Default */}
      <Route path="*" element={<LandingPage />} />

    </Routes>
      {/* 2. PLACE THE CONTAINER AT THE ROOT LEVEL */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Options: "light", "dark", "colored"
      />
    </BrowserRouter >

  )
}

export default App
