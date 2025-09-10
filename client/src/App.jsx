import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import BlogTitles from "./pages/BlogTitles";
import WriteArtical from "./pages/WriteArtical";
import Dashboard from "./pages/Dashboard";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import { Toaster } from "react-hot-toast";

// Clerk
import { UserProfile } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// ----------------- Account Page -----------------
const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* 🔹 Back Button (responsive position) */}
      {/* 🔹 Back Button (responsive, right side with offset) */}
      {/* 🔹 Back Button (responsive: right on mobile, left on desktop) */}
      <button
        onClick={() => navigate(-1)}
        className="
    absolute z-50 p-2 rounded-full hover:bg-black/10 transition
    top-9 right-5 md:top-6 md:left-6 md:right-auto
  "
      >
        <ArrowLeft className="w-5 h-5 text-black md:text-white" />
      </button>

      {/* 🔹 Clerk Profile */}
      <UserProfile />
    </motion.div>
  );
};

// ----------------- Main App -----------------
const App = () => {
  const location = useLocation();

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
  );
};

export default App;
