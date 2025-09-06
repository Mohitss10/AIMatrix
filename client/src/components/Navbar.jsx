import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-2 px-4 sm:px-20 xl:px-32"
    >
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        // onClick={() => navigate('./Hero')}
      >
        <img src={assets.logo} alt="logo" className="w-7" />
        {/* Text only visible on small screens */}
        <span className="font-semibold bg-gradient-to-r from-gray-300 via-gray-400  to-gray-500 bg-clip-text text-transparent text-2xl">
          AIMatrix
        </span>
      </div>

      {/* Center: Theme toggle */}
      <div className="flex gap-2 items-center">
        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? <UserButton /> : null}
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </motion.div>
  )
}

export default Navbar
