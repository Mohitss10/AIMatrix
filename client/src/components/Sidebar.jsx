import { assets } from '../assets/assets';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { House, SquarePen, Eraser, FileText, Hash, Image, Scissors, Users, LogOut } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <motion.div
       
      transition={{ type: 'spring', stiffness: 120, damping: 20, duration: 0.4 }}
      className={`
        fixed top-14 left-0 z-50
        h-[calc(100vh-55px)] sm:h-[86.9vh] w-60
        text-slate-550 px-4 sm:p-6
        transform sm:translate-x-0 sm:opacity-100 sm:static sm:block flex justify-center
      `}
    >
      {/* Scrollable container */}
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="py-6">
          <img src={user.imageUrl} alt="User" className="w-14 rounded-full mx-auto" />
          <h1 className="mt-2 text-center text-sm">{user.fullName}</h1>

          <div className="mt-1 pt-6 border-t border-white/10 space-y-2 text-sm">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10 transition ${
                    isActive ? 'bg-white/10 font-medium' : ''
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="px-2 py-4 flex items-center justify-between">
          <div onClick={openUserProfile} className="flex items-center gap-2 cursor-pointer">
            <img src={user.imageUrl} className="w-6 h-6 rounded-full" alt="user" />
            <div>
              <h1 className="text-sm">{user.fullName}</h1>
              <p className="text-xs">
                <Protect plan="premium" fallback="Free">Premium</Protect> Plan
              </p>
            </div>
          </div>
          <LogOut
            onClick={() => signOut()}
            className="w-5 h-5  cursor-pointer"
          />
        </div>



        <div className="block sm:hidden mt-2">
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
