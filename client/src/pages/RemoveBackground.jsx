import React, { useState, useEffect } from 'react';
import { Eraser, Sparkles, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState('');
  const [showLeftCol, setShowLeftCol] = useState(true); // ✅ default open

  const { getToken } = useAuth();

  // ✅ Auto-close left col after image is processed (mobile/tablet only)
  useEffect(() => {
    if (processedImage && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowLeftCol(false);
    }
  }, [processedImage]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload an image');

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setProcessedImage(data.content); // ✅ triggers useEffect to close on mobile
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column */}
        <div className={`flex-1 flex flex-col w-full max-w-full bg-slate-700/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ease-in-out`}>
          <div
            className="flex items-center justify-between p-5 cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setShowLeftCol((s) => !s);
              }
            }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#FF4938]" />
              <h1 className="text-xl font-semibold ">Background Removal</h1>
            </div>
            <button
              type="button"
              aria-label="Toggle background form"
              className="lg:hidden p-1 transition-transform duration-300"
              style={{ transform: `rotate(${showLeftCol ? 180 : 0}deg)` }}
              onClick={(e) => {
                e.stopPropagation();
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setShowLeftCol((s) => !s);
                }
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Collapsible Form */}
          <div
            className={`px-5 transition-all duration-500 ease-in-out lg:pt-0 lg:pb-5`}
            style={{
              maxHeight: showLeftCol ? '800px' : '0px',
              opacity: showLeftCol ? 1 : 0,
            }}
          >
            <form onSubmit={onSubmitHandler} className="flex flex-col pb-5">
              <p className="mt-2 text-sm font-medium ">Upload Image</p>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
                className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-slate-400 bg-transparent  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200/20  hover:file:bg-gray-200/30"
                required
              />

              <p className="text-xs  font-light mt-1">
                Supports JPG, PNG, and other image formats
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938]  px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin" />
                ) : (
                  <Eraser className="w-5" />
                )}
                Remove Background
              </button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 gap-4 w-full max-w-full p-5 rounded-2xl flex flex-col bg-slate-700/10 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#FF4938]" />
            <h1 className="text-xl font-semibold ">Processed Image</h1>
          </div>

          {!processedImage ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 ">
                <Eraser className="w-9 h-9" />
                <p>Upload an image and click "Remove Background" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex-1 overflow-y-scroll scrollbar-hide flex flex-col gap-4">
              <img
                src={processedImage}
                alt="Processed"
                className="max-w-full rounded-lg border border-white/10"
              />
              <button
                type="button"
                onClick={async () => {
                  try {
                    const response = await fetch(processedImage, { mode: 'cors' });
                    if (!response.ok) throw new Error('Image fetch failed');

                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'background-removed.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);

                    toast.success("Image downloaded!", {
                      duration: 3000,
                      style: { background: '#334155', color: '#ffffff', border: '1px solid #00AD25' },
                      icon: '✅'
                    });
                  } catch (err) {
                    toast.error("Download failed!", {
                      duration: 3000,
                      style: { background: '#334155', color: '#ffffff', border: '1px solid #ff4d4d' },
                      icon: '⚠️'
                    });
                  }
                }}
                className="bg-slate-700/10 border border-white/20  px-4 py-2 rounded-lg text-sm text-center w-fit backdrop-blur-sm"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 p-6 bg-slate-700/10 border border-white/10 rounded-xl hidden sm:block">
        <h2 className="text-lg font-bold mb-3">Remove Background from Images Instantly</h2>
        <p className="text-sm mb-2">
          Removing backgrounds from images has never been easier. With our AI-powered background remover, you can upload any image and get a clean, transparent background in seconds — perfect for product photos, profile pictures, or creative projects.
        </p>
        <p className="text-sm mb-2">
          Simply upload your image, click “Remove Background,” and our system will automatically detect and remove the background while keeping your subject sharp and clear.
        </p>
      </div>

    </div>



  );
};

export default RemoveBackground;
