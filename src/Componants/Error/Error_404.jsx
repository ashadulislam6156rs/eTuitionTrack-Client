import React from "react";
import { motion } from "framer-motion";
import { GoHome } from "react-icons/go";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from "react-router";

const Error_404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 text-white px-4 py-10">
      <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
        <span className="text-7xl font-extrabold drop-shadow">4</span>

        <motion.div
          className="relative w-[90px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="bg-pink-400 w-full h-[90px] rounded-t-full rounded-b-md shadow-lg relative">
            <div className="absolute top-6 left-5 w-[22px] h-[28px] bg-white rounded-full">
              <div className="w-[10px] h-[12px] bg-slate-800 rounded-full absolute bottom-1 right-1" />
            </div>
            <div className="absolute top-6 right-5 w-[22px] h-[28px] bg-white rounded-full">
              <div className="w-[10px] h-[12px] bg-slate-800 rounded-full absolute bottom-1 right-1" />
            </div>
          </div>
          <div className="absolute bottom-[-12px] w-full flex justify-between px-1">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="w-[18px] h-[18px] bg-pink-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        <span className="text-7xl font-extrabold drop-shadow">4</span>

        {/* Dots */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 bg-white rounded-full opacity-50"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* Pac-Man */}
        <motion.div
          className="w-[80px] h-[80px] bg-yellow-400 rounded-full shadow-lg relative"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        >
          <motion.div
            className="absolute w-full h-full bg-slate-900"
            animate={{
              clipPath: [
                "polygon(50% 50%, 100% 20%, 100% 80%)",
                "polygon(50% 50%, 100% 50%, 100% 50%)",
                "polygon(50% 50%, 100% 20%, 100% 80%)",
              ],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Text */}
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-4xl font-semibold">o</span>ops! This page cannot
          be found
        </h1>
        <p className="text-slate-300 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={"/"}
            className="px-5 py-2 flex items-center gap-1 text-white rounded-full bg-pink-400 font-semibold shadow-md hover:shadow-lg transition"
          >
            <GoHome />
            Go Back Home
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Error_404;
