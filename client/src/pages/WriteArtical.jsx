import React, { useState, useRef } from "react";
import { Edit, Sparkles, ChevronDown, Download } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import html2pdf from "html2pdf.js";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articalLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1200, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articalLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [showConfig, setShowConfig] = useState(true);

  // ✅ Button state
  const [buttonState, setButtonState] = useState("save");
  // "save" → Save PDF
  // "download" → Click to Download Again (stays until refresh)

  const { getToken } = useAuth();
  const articleRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const token = await getToken();
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setContent(data.content);

        // reset to Save PDF for each new article
        setButtonState("save");

        if (typeof window !== "undefined" && window.innerWidth < 1024) {
          setShowConfig(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // 📌 Save as PDF
  const handleSavePDF = () => {
    if (!articleRef.current) return;
    const element = articleRef.current;
    const opt = {
      margin: 0.5,
      filename: "article.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();

    toast.success("PDF saved!", {
      duration: 2200,
      className: "bg-transparent text-white shadow-none border-none",
      icon: "✅",
    });

    // ✅ After first save, lock button to "download" permanently
    if (buttonState === "save") {
      setButtonState("download");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 w-full max-w-full p-5 bg-slate-700/10 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          {/* Heading */}
          <div
            className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
            onClick={() => {
              if (window.innerWidth < 1024) setShowConfig(!showConfig);
            }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#4A7AFF]" />
              <h1 className="text-xl font-semibold">Article Configuration</h1>
            </div>
            <div
              className="lg:hidden transition-transform duration-300"
              style={{ transform: `rotate(${showConfig ? 180 : 0}deg)` }}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {/* Config Section */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden lg:overflow-visible lg:max-h-none`}
            style={{
              maxHeight: showConfig ? "1000px" : "0px",
              opacity: showConfig ? 1 : 0,
            }}
          >
            <p className="mt-6 text-sm font-medium">Article Topic</p>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-slate-400 bg-transparent placeholder:text-slate-500 dark:placeholder:text-slate-400"
              placeholder="The future of artificial intelligence is..."
              required
            />

            <p className="m-4 text-sm font-medium">Article Length</p>
            <div className="mt-3 ml-2 flex gap-3 flex-wrap">
              {articalLength.map((item, index) => (
                <span
                  onClick={() => setSelectedLength(item)}
                  className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ease-in-out
                  ${
                    selectedLength.text === item.text
                      ? "border-blue-500 text-blue-400 shadow-md shadow-blue-500/30 scale-105"
                      : "border-gray-400/40 hover:shadow-md hover:shadow-gray-500/30 hover:scale-105"
                  }`}
                  key={index}
                >
                  {item.text}
                </span>
              ))}
            </div>

            <button
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF]  px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Edit className="w-5" />
              )}
              Generate article
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN */}
        <div className="flex-1 w-full h-[60vh] max-w-full p-5 rounded-2xl flex flex-col bg-slate-700/10 backdrop-blur-sm border border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5 text-[#4A7AFF]" />
              <h1 className="text-xl font-semibold">Generated article</h1>
            </div>

            {/* Save / Download Again Button */}
            {content && (
              <button
                onClick={handleSavePDF}
                className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all
                  ${
                    buttonState === "save"
                      ? "bg-[#226BFF] hover:bg-[#1557d1] text-white"
                      : "bg-[#226BFF] hover:bg-[#1557d1] text-white"
                  }`}
              >
                <Download className="w-4 h-4" />
                {buttonState === "save" ? "Save PDF" : "Click to Download Again"}
              </button>
            )}
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            </div>
          ) : (
            <div
              ref={articleRef}
              className="mt-3 overflow-y-auto text-sm markdown-body p-5 rounded-lg custom-scrollbar h-[60vh] sm:h-[70vh]"
            >
              <Markdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-sm leading-relaxed mb-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="list-disc list-inside text-sm mb-1" {...props} />
                  ),
                }}
              >
                {content}
              </Markdown>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 p-6 bg-slate-700/10 border border-white/10 rounded-xl hidden sm:block">
        <h2 className="text-lg font-bold mb-3">Write High-Quality Articles with AI</h2>
        <p className="text-sm mb-2">
          Our AI article writer helps you create engaging, well-structured, and SEO-friendly
          content in just minutes — perfect for blogs, websites, and social media.
        </p>
        <p className="text-sm">
          Save time, boost productivity, and focus on your ideas while AI handles the heavy lifting
          of writing.
        </p>
      </div>
    </div>
  );
};

export default WriteArticle;
