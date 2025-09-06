import React from 'react';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'




// Reusable fadeIn variant
const fadeIn = (direction = 'up', delay = 0) => {
  const from = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: -40, opacity: 0 },
    right: { x: 40, opacity: 0 },
  };
  return {
    initial: from[direction],
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { duration: 0.8, delay },
  };
};

// Parent variant for staggered word animation
const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Each word animation
const wordVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const umbrellaLetters = "A I M a t r i x".split(" ");

const umbrellaScales = [
  1.8, // 'A' bigger left edge
  1.5, // 'I'
  1.3, // 'M'
  1,   // 'a' center normal scale
  1,   // 't' center normal scale
  1.3, // 'r'
  1.5, // 'i'
  1.8, // 'x' bigger right edge
];

const Hero = () => {
  const navigate = useNavigate();

  const headingLine1 = "Harness Cutting-Edge AI to Work Smarter, Not Harder".split(" ");
  const highlight = ["ai", "work", "smarter"];

  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <section className="relative  min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-20 xl:px-32">

      {/* 💫 Animated glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px]" />
      </div>

      {/* 🔵 Blurry AIMatrix background text */}
      {/* 🔵 Blurry AIMatrix background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 justify-center pt-[3vh] px-10 overflow-visible hidden xl:flex"
        style={{ userSelect: "none" /* , outline: '1px solid red' */ }}
      >
        <div
          className="flex gap-[-0.15em]"
          style={{ filter: "blur(4px)", opacity: 0.07, userSelect: "none" }}
        >
          {umbrellaLetters.map((letter, idx) => (
            <span
              key={idx}
              className="uppercase font-bold text-white "
              style={{
                fontSize: "300px",
                transformOrigin: "bottom center",
                transform: `scaleX(${umbrellaScales[idx]})`,
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>






      {/* 🧠 Headline animation */}
      <div className="text-center mb-6 z-10">
        <motion.h1
          className="text-[34px] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mx-auto leading-tight sm:p-4 tracking-tight flex flex-wrap justify-center gap-x-3"
          variants={containerVariant}
          initial="initial"
          animate="animate"
        >
          {headingLine1.map((word, idx) => {
            const cleaned = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const isHighlighted = highlight.includes(cleaned);

            return (
              <motion.span
                key={idx}
                variants={wordVariant}
                className={
                  isHighlighted
                    ? "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
                }
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>

      {/* 📄 Subtext with soft fade-in */}
      <motion.p
        className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto  text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
      >
        From text to visuals, supercharge your imagination with our powerful AI toolkit.
      </motion.p>

      {/* 🎯 Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xl mt-8 z-10"
        {...fadeIn("up", 2.2)}
      >
<div className="flex gap-4">
  {/* Start for Free Button */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
  <div>
    <button
      onClick={user ? () => navigate("/ai") : openSignIn}
      className="relative inline-flex h-12 w-auto overflow-hidden rounded-full p-[1px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      <span className="absolute inset-[-1000%]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center gap-2 justify-center rounded-full bg-primary text-white px-8 text-[15px] backdrop-blur-3xl transition-all duration-300 ease-in-out">
        {user ? "Start for Free" : "Create Account"}
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </button>
  </div>
</div>


</div>



      </motion.div>

      {/* 👥 Trust indicator */}
      <motion.div
        className="flex items-center gap-4 mt-10 mx-auto  z-10"
        {...fadeIn("up", 2.6)}
      >
        <div className="flex justify-center animate-out zoom-in duration-200 delay-200">
          <div>
            <div className="font-semibold text-center md:text-left">Trusted by</div>
            <div className="flex space-x-2 items-center flex-col md:flex-row">
              <div className="flex -space-x-2 overflow-hidden p-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/51.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/4.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                  alt=""
                />
                {/* <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/9.jpg"
                  alt=""
                /> */}
                {/* <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/9.jpg"
                  alt=""
                /> */}
              </div>
              <div>Join 100+ other members</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


export default Hero;
