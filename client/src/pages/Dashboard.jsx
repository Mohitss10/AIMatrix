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
  const [videoLoading, setVideoLoading] = useState(true);

  const { getToken } = useAuth();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  // ✅ Track time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
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

      {/* Video Section */}
      <div className="mt-5 relative w-full h-[67vh] rounded-xl overflow-hidden shadow-lg border border-white/10">
        {/* Loader */}
        {videoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/ad2.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoading(false)}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={() => setVideoLoading(true)} // show loader only while buffering
          onPlaying={() => setVideoLoading(false)} // ✅ hide loader when playback resumes
        />

        {/* Controls */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="bg-black/50 text-white p-3 rounded-full mb-2"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          {/* Progress Bar + Time */}
          <div className="flex flex-col items-center w-11/12">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              step="0.1"
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white
               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 
               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
               [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full 
               [&::-moz-range-thumb]:bg-white"
            />
            <div className="flex justify-between text-xs text-white w-full mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleMute}
            className="bg-black/50 text-white p-2 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
