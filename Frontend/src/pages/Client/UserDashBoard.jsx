import { Routes, Route } from "react-router-dom";
import React from 'react'
import Profile from './Profile'
import MyBiddings from './MyBiddings'
import Dashbar from "../../components/Dashbar";

const UserDashBoard = () => {
  return (
    <div className="flex flex-col bg-gray-100 pt-16 min-h-screen">
      <div className="w-full">
        <Dashbar />
      </div>
      <div className="w-full p-6 flex-grow flex flex-col">
        <div className="bg-white shadow-lg p-8  flex-grow">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/biddings" element={<MyBiddings />} />
            <Route path="*" element={
              <div className="flex flex-1 justify-center text-3xl font-semibold">
                Welcome to the User Dashboard! Select a menu option to get started.
              </div>
              } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default UserDashBoard