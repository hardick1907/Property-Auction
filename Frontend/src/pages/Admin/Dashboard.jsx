import { Routes, Route } from "react-router-dom";
import AddProperty from "./AddProperty";
import Listings from "./Listings"; 
import Users from "./Users"; 
import WinningBids from "./WinningBids"; 
import Dashbar from "../../components/Dashbar";
import PropertyPage from "./PropertyPage";
import EditProperty from "./EditProperty";

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-gray-100 pt-16 min-h-screen">
      <div className="w-full"> {/* Sidebar fixed to full height */}
        <Dashbar />
      </div>
      <div className="w-full p-6 flex-grow flex flex-col"> {/* Content grows, aligns flex column */}
        <div className="bg-white shadow-lg p-8  flex-grow">
          <Routes>
            <Route path="/listings" element={<Listings />} />
            <Route path="listings/:id" element={<PropertyPage />} />
            <Route path="/listings/:id/edit" element={<EditProperty />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/users" element={<Users />} />
            <Route path="/winningbids" element={<WinningBids />} />
            {/* Default Route */}
            <Route path="*" element={
              <div className="flex flex-1 justify-center text-3xl font-semibold">
                Welcome to the Admin Dashboard! Select a menu option to get started.
              </div>
              } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
