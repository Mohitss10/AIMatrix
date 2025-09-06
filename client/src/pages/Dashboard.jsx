import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Community from './Community';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [creations, setCreations] = useState([]);
  const [plan, setPlan] = useState('Free');
  const [loading, setLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(false); // default closed


  const tools = [
    { name: "Write Article", path: "/ai/write-article" },
    { name: "Blog Titles", path: "/ai/blog-titles" },
    { name: "Generate Images", path: "/ai/generate-images" },
    { name: "Remove Background", path: "/ai/remove-background" },
    { name: "Remove Object", path: "/ai/remove-object" },
    { name: "Review Resume", path: "/ai/review-resume" },
  ];

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setCreations(data.creations);
        setPlan(data.plan || 'Free');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className=" min-h-[70vh] sm:h-[82.5vh] border-white/10 lg:min-h-[86vh] sm:mx-auto overflow-y-auto scrollbar-hide border p-4 rounded-xl">
      {/* Card Section */}
      {/* <div className="flex gap-4 overflow-x-auto sm:flex-wrap scrollbar-hide justify-center">
        {/* Total creation card */}
        {/* <div className="flex-shrink-0 flex justify-between items-center w-38 sm:w-55 lg:w-[48%] p-4 sm:p-6 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/30">
          <div className="text-slate-100">
            <p className="text-sm opacity-80">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
            <Sparkles className="w-5 text-white" />
          </div>
        </div> */}

        {/* Active plan card */}
        <div className=" flex-shrink-0 flex justify-between items-center w-full lg:w-full p-2 sm:p-4 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/10">

          <div >
            <p className="text-sm opacity-80">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {plan === 'premium' ? 'Premium' : 'Free'}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
            <Gem className="w-5" />
          </div>
        </div>
            <h1 className="text-sm pl-3  mt-3">From your words to a work of art⚡</h1>

      
<div className="h-[43vh] sm:h-[58vh] mt-5 scrollable-container overflow-y-auto">
  <Community />
</div>

      

      {/* Mobile Only */}
<motion.button
  onClick={() => {
    const container = document.querySelector('.scrollable-container');
    if (container) {
      container.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
    }
  }}
  className="mt-6 px-6 py-3 rounded-xl w-full  bg-slate-800/30 font-medium shadow-lg hover:shadow-xl transition sm:hidden flex flex-col items-center"
  animate={{
    y: [0, -8, 0, 8, 0],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  Scroll to view more
  <ChevronDown className="h-6 w-6 text-shadow-white" />
</motion.button>






    </div>
  );
};

export default Dashboard;
