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
      {/* 🔹 Back Arrow → goes to previous page */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-black/20 hover:bg-black/60 transition"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* 🔹 Clerk Profile */}
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full h-full flex justify-center items-center',
            card:
              'w-full max-w-5xl bg-black/50 text-white backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex',
            navbar:
              'bg-transparent border-r border-white/20 px-4 py-6 w-64',
            navbarItem:
              'text-gray-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition',
            navbarItemActive: 'text-white rounded-lg',
            navbarItemText: 'font-medium',
            content: 'flex-1 p-6 bg-white/5 rounded-xl ml-4',
            headerTitle: 'text-3xl font-bold mb-2',
            headerSubtitle: 'text-sm text-gray-300',
            profileSection: 'rounded-xl p-4 bg-white/10 mb-4',
            profileSectionTitle: 'text-lg font-semibold ',
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
