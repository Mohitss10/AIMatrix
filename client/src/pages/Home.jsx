import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth animation only for Footer
  const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Plan />

      {/* Footer with smooth animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Footer />
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
  onClick={scrollToTop}
  initial={{ opacity: 0, y: 100 }} // start hidden below
  animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }} // slide up or down
  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} // smooth easing
  className="fixed bottom-5 right-5 p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out "
>
  <FaArrowUp size={18} />
</motion.button>

    </>
  );
};

export default Home;
