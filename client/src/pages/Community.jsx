import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Heart, Send } from 'lucide-react'; // ✅ Added Share2 icon
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const fetchCreation = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        '/api/user/toggle-like-creations',
        { id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreation();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Handle share
  const handleShare = async (creation) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this creation!",
          text: creation.prompt || "Look what I found!",
          url: creation.content, // ✅ Direct image link
        });
      } else {
        // fallback: copy to clipboard
        await navigator.clipboard.writeText(creation.content);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Could not share this image.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreation();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 bg-slate-700/10 h-[83vh] flex flex-col text-slate-300 p-2 border border-white/10 rounded-2xl 
      ${!isSidebarVisible ? 'w-full' : ''}`}
    >
      <div className="flex-1 rounded-2xl p-3 overflow-y-auto pr-2 scrollbar-hide">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group w-full h-full rounded-lg overflow-hidden"
            >
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute inset-0 flex gap-2 items-end justify-end p-3 rounded-lg 
                              transition group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-black/80">
                <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
                <div className="flex gap-3 items-center">
                  
                  {/* ✅ Share Button */}
                  <Send
                    onClick={() => handleShare(creation)}
                    className="min-w-5 h-5 hover:scale-110 cursor-pointer transition text-white"
                  />

                  {/* ✅ Like Button */}
                  <div className="flex gap-1 items-center">
                    <p>{creation.likes.length}</p>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition ${
                        creation.likes.includes(user.id)
                          ? 'fill-red-500 text-red-600'
                          : 'text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
