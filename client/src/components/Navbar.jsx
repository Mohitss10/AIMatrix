import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
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
        onClick={() => navigate('/')}
      >
        <img src={assets.logo} alt="logo" className="w-7" />
        <span className="font-semibold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent text-2xl">
          AIMatrix
        </span>
      </div>

      {/* Right: Theme toggle + Profile */}
      <div className="flex gap-3 items-center">
        {/* Profile Avatar */}
        {user ? (
          <img
            src={user.imageUrl}
            alt="profile"
            onClick={() => navigate('/account')}
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition"
          />
        ) : null}

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </motion.div>
  )
}

export default Navbar
