import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Notifications from './components/Notifications'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {  Loader } from 'lucide-react'
import Dashboard from './pages/Admin/Dashboard'
import AdminLogIn from './pages/Admin/Login'
import Register from './pages/Client/Register'
import LoginPage from './pages/Client/LoginPage'
import AddProperty from './pages/Admin/AddProperty'
import Listings from './pages/Admin/Listings'
import WinningBids from './pages/Admin/WinningBids'
import Users from './pages/Admin/Users'
import PropertyPage from './pages/Admin/PropertyPage'
import EditProperty from './pages/Admin/EditProperty'
import UserDashBoard from './pages/Client/UserDashBoard'
import Profile from './pages/Client/Profile'
import MyBiddings from './pages/Client/MyBiddings'
import AuctionList from './pages/Client/AuctionList'
import AuctionDetails from './pages/AuctionDetails'
import Contact from './pages/Contact'
import About from './pages/About'


const App = () => {

  const {checkAuth,isCheckingAuth,authUser,authAdmin,checkAdminAuth} = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check regular user auth
    checkAdminAuth(); // Check admin auth
  }, []);

  if (isCheckingAuth){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme="corporate">
      <Router>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auctions" element={<AuctionList/>}/>
          <Route path="/auctions/:id" element={<AuctionDetails/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>

          <Route path='/register' element={!authUser?<Register/>:<Home/>}/>
          <Route path="/login" element={!authUser?<LoginPage/>:<Home/>}/>
          <Route path="/userdashboard/*" element={authUser?<UserDashBoard/>:<LoginPage/>}>
            <Route path="profile" element={authUser?<Profile/>:<LoginPage/>}/>
            <Route path="biddings" element={authUser?<MyBiddings/>:<LoginPage/>}/>
          </Route>

          <Route path="/adminlogin" element={!authAdmin?<AdminLogIn/>:<Home/>}/>
          <Route path="/dashboard/*" element={authAdmin ? <Dashboard /> : <Home />}>
            <Route path="listings/*" element={authAdmin ? <Listings /> : <Home />}>
              <Route path=":id/" element={authAdmin ? <PropertyPage /> : <Home />} >
                <Route path="edit" element={authAdmin ? <EditProperty /> : <Home />} />
              </Route>
            </Route>
            <Route path="addproperty" element={authAdmin ? <AddProperty /> : <Home />} />
            <Route path="users" element={authAdmin ? <Users /> : <Home />} />
            <Route path="winningbids" element={authAdmin ? <WinningBids /> : <Home />} />
          </Route>

        </Routes>
        <Footer/>
      </Router>
      <Notifications/>
    </div>
    
    
  )
}

export default App