import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';
import ThemeToggle from '../components/ThemeToggle'; // ⬅ Import our theme toggle


const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  // Disable body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebar]);

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-8 py-3 bg-slate-950/10 backdrop-blur-lg flex items-center justify-between">
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => navigate('/')}
  >
    <img src={assets.logo} alt="logo" className="w-7" />
    <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 font-semibold bg-clip-text text-transparent text-2xl">
      AIMatrix
    </span>
  </div>

  {/* Mobile Menu Icon (only show when sidebar is closed) */}
  {!sidebar && (
    <Menu
      onClick={() => setSidebar(true)}
      className="h-6 w-6 sm:hidden cursor-pointer"
    />
  )}

  {/* Theme Toggle - hidden on desktop */}
<div className="hidden sm:block">
  <ThemeToggle />
</div>

</nav>


      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full z-50  backdrop-blur-lg
            transform transition-transform duration-300 ease-in-out
            w-full sm:static sm:translate-x-0 sm:w-64
            ${sidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          `}
        >
          {/* Close Button (Mobile only) */}
          <div className="sm:hidden mr-2 flex justify-end p-4">
            <X
              onClick={() => setSidebar(false)}
              className="h-7 w-7 cursor-pointer hover:text-red-400 transition-colors"
            />
          </div>

          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>

        {/* Overlay behind sidebar on mobile when open */}
        {sidebar && (
          <div
            className="fixed inset-0 bg-slate-900/10 bg-opacity-50 z-40 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto  p-4 scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
