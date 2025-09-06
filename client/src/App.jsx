import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import BlogTitles from './pages/BlogTitles'
import WriteArtical from './pages/WriteArtical'
import Dashboard from './pages/Dashboard'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import { Toaster } from 'react-hot-toast'

// Clerk
import { UserProfile } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'

// Framer Motion
import { AnimatePresence, motion } from 'framer-motion'

// ----------------- Account Page -----------------
const AccountPage = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://authorfy.com/wp-content/themes/Authorfy/assets/img/masthead-inner-bg.svg')",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* 🔹 Back Button (responsive position) */}
      <button
        onClick={() => navigate(-1)}
        className="
          absolute z-50 p-2 rounded-full bg-black/30 hover:bg-black/60 transition
          top-4 left-4 md:top-6 md:left-6
          md:block
        "
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* 🔹 Clerk Profile */}
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full h-full flex justify-center items-center',
            card:
              'w-full max-w-5xl text-white backdrop-blur-xl p-4 sm:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row relative',
            navbar:
              'hidden md:block bg-transparent border-r border-white/20 px-4 py-6 w-64',
            navbarItem:
              'text-gray-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition',
            navbarItemActive: 'text-white rounded-lg',
            navbarItemText: 'font-medium',
            content:
              'flex-1 p-4 sm:p-6 bg-white/5 rounded-xl md:ml-4 relative',
            header: 'relative flex items-center justify-between mb-4',
            headerTitle: 'text-2xl sm:text-3xl font-bold',
            headerSubtitle: 'text-xs sm:text-sm text-gray-300',
            profileSection: 'rounded-xl p-4 bg-white/10 mb-4',
            profileSectionTitle: 'text-base sm:text-lg font-semibold',
            formButtonPrimary:
              'bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2 transition',
          },
        }}
      />
    </motion.div>
  )
}

// ----------------- Main App -----------------
const App = () => {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="write-article" element={<WriteArtical />} />
            <Route path="blog-titles" element={<BlogTitles />} />
            <Route path="generate-images" element={<GenerateImages />} />
            <Route path="remove-background" element={<RemoveBackground />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
          </Route>

          {/* Account page */}
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
