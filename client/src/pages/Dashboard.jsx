import React, { useEffect, useState, useRef } from "react";
import { Gem, VolumeX, Volume2, Play, Pause } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [creations, setCreations] = useState([]);
  const [plan, setPlan] = useState("Free");
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
        setPlan(data.plan || "Free");
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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-[70vh] sm:h-[82.5vh] lg:min-h-[86vh] sm:mx-auto overflow-y-auto scrollbar-hide rounded-xl">
      {/* Active Plan card */}
      <div className="flex-shrink-0 flex justify-between items-center w-full p-2 sm:p-4 rounded-xl border border-white/10 backdrop-blur-lg shadow-md bg-slate-800/10">
        <div>
          <p className="text-sm opacity-80">Active Plan</p>
          <h2 className="text-xl font-semibold">
            {plan === "premium" ? "Premium" : "Free"}
          </h2>
        </div>
        <div className="w-10 h-10 rounded-lg flex justify-center items-center shadow-md">
          <Gem className="w-5" />
        </div>
      </div>

      {/* 🔥 Responsive Video Ad Section */}
      {/* 🔥 Responsive Video Ad Section */}
     {/* 🔥 Fullscreen Video Ad Section */}
<div className="mt-5 relative w-full h-[67vh] rounded-xl overflow-hidden shadow-lg border border-white/10">
  <video
    ref={videoRef}
    className="w-full h-full object-cover"
    src="/ad2.mp4"
    autoPlay
    loop
    muted
    playsInline
  />

  {/* ✅ Play/Pause Button */}
  {/* Mobile: always visible | Desktop: only on hover */}
  <div className="absolute inset-0 flex items-end justify-center pb-6">
    <button
      onClick={togglePlay}
      className="bg-black/50 text-white p-3 rounded-full
                 flex  sm:group-hover:opacity-100 transition"
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
    </button>
  </div>

  {/* ✅ Mute Button */}
  <div className="absolute bottom-2 right-2">
    <button
      onClick={toggleMute}
      className="bg-black/50 text-white p-2 rounded-full
                 flex  sm:group-hover:opacity-100 transition"
    >
      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </button>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
