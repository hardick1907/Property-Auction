import { BadgeDollarSign, Contact, House, KeyRound, LayoutDashboard, ScanEye, ScrollText } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { authUser, logout, authAdmin, adminLogout } = useAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Modified dropdown menu positioning and max-height */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow max-h-[calc(100vh-4rem)] overflow-y-auto fixed top-12 left-2"
          >
            <li>
              <Link to="/">
                <House />
                Home
              </Link>
            </li>
            <li>
              <Link to="/auctions">
                <BadgeDollarSign />
                Auction
              </Link>
            </li>
            {authUser && (
              <li>
                <Link to="/userdashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
              </li>
            )}
            {authAdmin && (
              <li>
                <Link to="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
            )}
            <li>
                <Link to="/about">
                  <ScrollText />
                  About
                </Link>
            </li>
            <li>
              <Link to="/contact">
                <Contact />
                  Contact
              </Link>
            </li>
            {/* Register button for mobile */}
            {!authUser && !authAdmin && (
              <li>
                <Link to="/register" className="btn bg-base-100 border-none shadow-none hover:bg-base-100">
                  <KeyRound />
                  Register
                </Link>
              </li>
            )}
            {/* Logout buttons for mobile */}
            {authUser && (
              <li>
                <button onClick={logout} className="btn bg-base-100 border-none shadow-none hover:bg-base-100 justify-start w-full">
                  <KeyRound />
                  Logout
                </button>
              </li>
            )}
            {authAdmin && (
              <li>
                <button
                  onClick={adminLogout}
                  className="btn bg-base-100 border-none shadow-none hover:bg-base-100 justify-start w-full"
                >
                  <KeyRound />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn bg-base-100 border-none shadow-none hover:bg-base-100 text-xl">Auctionas</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">
              <House />
              Home
            </Link>
          </li>
          <li>
            <Link to="/auctions">
              <BadgeDollarSign />
              Auction
            </Link>
          </li>
          {authUser && (
            <li>
              <Link to="/userdashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </li>
          )}
          {authAdmin && (
            <li>
              <Link to="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link to="/about">
              <ScrollText />
              About
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Contact />
                Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3 hidden lg:flex">
        {!authUser && !authAdmin && (
          <Link to="/register" className="btn bg-base-100 border-none shadow-none hover:bg-base-100">
            <KeyRound />
            Register
          </Link>
        )}
        {authUser && (
          <button onClick={logout} className="btn bg-base-100 border-none shadow-none hover:bg-base-100">
            <KeyRound />
            Logout
          </button>
        )}
        {authAdmin && (
          <button
            onClick={adminLogout}
            className="btn bg-base-100 border-none shadow-none hover:bg-base-100"
          >
            <KeyRound />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;