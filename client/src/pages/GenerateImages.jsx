import React, { useState, useEffect } from 'react';
import { Image, Sparkles ,Download} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style'
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [showLeftCol, setShowLeftCol] = useState(true); // ✅ default open

  const { getToken } = useAuth();

  // ✅ Close left column only after image is generated (mobile/tablet only)
  useEffect(() => {
    if (content && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowLeftCol(false);
    }
  }, [content]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate an image in ${input} in the style ${selectedStyle}`;
      const token = await getToken();
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setContent(data.content);
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
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden">

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className={`flex-1 w-full max-w-full p-5 bg-slate-700/10 backdrop-blur-sm rounded-2xl border border-white/10 
            transition-all duration-500 ease-in-out
            ${showLeftCol ? 'max-h-[2000px] opacity-100' : 'max-h-16 overflow-hidden opacity-80 lg:max-h-full lg:opacity-100'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#00AD25]" />
              <h1 className="text-xl font-semibold ">AI Image Generator</h1>
            </div>
            {/* Toggle Arrow for Mobile */}
            <svg
              onClick={() => setShowLeftCol(!showLeftCol)}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4  cursor-pointer transition-transform duration-300 lg:hidden ${showLeftCol ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <p className="mt-6 text-sm font-medium ">Describe Your Image</p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-slate-400 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-[13px] placeholder:italic"
            placeholder="Describe what you want to see in the image..."
            required
          />



          <p className="mt-6 text-sm font-medium  ">Style</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {imageStyle.map((item) => (
              <span
                onClick={() => setSelectedStyle(item)}
                className={`text-xs sm:text-xs px-4 py-1 sm:px-4 sm:py-1 border rounded-full cursor-pointer transition-all duration-300 ease-in-out
    ${selectedStyle === item
                    ? 'border-green-500 shadow-md shadow-green-500/30 scale-105'
                    : 'border-gray-400/40 hover:shadow-md hover:shadow-gray-500/30 hover:scale-105'
                  }`}
                key={item}
              >
                {item}
              </span>

            ))}
          </div>


          <div className="my-6 flex items-center gap-2">
            <label className="relative cursor-pointer" htmlFor="publishToggle">
              <input
                type="checkbox"
                id="publishToggle"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700/10 rounded-full peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm ">Make this image Public</p>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50]  px-4 py-3 mt-4 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Generate Image
          </button>
        </form>

        {/* Right Column */}
{/* Right Column */}
<div className="flex-1 gap-2 w-full max-w-full p-5 rounded-2xl flex flex-col bg-slate-700/10 backdrop-blur-sm border border-white/10 relative">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Image className="w-5 h-5 text-[#00AD25]" />
      <h1 className="text-xl font-semibold ">Generated Image</h1>
    </div>

    {/* ✅ Save Image Button (Top-right) */}
    
  </div>
{content && (
  <button
    type="button"
    onClick={async () => {
      try {
        const response = await fetch(content);
        if (!response.ok) throw new Error('Image fetch failed');

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'generated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Image saved!", {
          duration: 2500,
          className:
            "bg-transparent text-white shadow-none border-none",
          icon: '✅',
        });
      } catch (err) {
        toast.error("Save failed!", {
          duration: 2500,
          className:
            "bg-transparent text-white shadow-none border-none",
          icon: '⚠️',
        });
        console.error("Save error:", err);
      }
    }}
    className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-[#226BFF] hover:bg-[#1557d1] text-white rounded-lg transition-all"
  >
    <Download className="w-4 h-4" />
    Save Image
  </button>
)}

  {!content ? (
    <div className="flex-1 flex justify-center items-center">
      <div className="text-sm flex flex-col items-center gap-5 ">
        <Image className="w-9 h-9" />
        <p>Enter a description and click "Generate Image" to get started</p>
      </div>
    </div>
  ) : (
    <div className="mt-3 flex-1 overflow-y-scroll scrollbar-hide flex flex-col gap-4">
      <img
        src={content}
        alt="Generated"
        className="max-w-full rounded-lg border border-white/10"
      />
    </div>
  )}
</div>


      </div>
      <div className="mt-6 p-6 bg-slate-700/10 border border-white/10 rounded-xl hidden sm:block">
        <h2 className="text-lg font-bold mb-3">Generate Stunning Images with AI</h2>
        <p className="text-sm mb-2">
          Create high-quality, unique images instantly using our AI image generator — perfect for art, design projects, social media, and marketing.
        </p>
      </div>

    </div>
  );
}

export default GenerateImages;
