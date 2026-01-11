import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { IoArrowBack } from "react-icons/io5";

const Error_404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-base-300 dark:bg-gray-900 justify-center px-4 py-10">
      <title>Error 404 | eTutionTrack</title>
      <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
        <span className="text-7xl text-[#F57C00] dark:text-orange-400 font-extrabold drop-shadow">
          4
        </span>

        <motion.div
          className="relative w-[90px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="bg-pink-400 dark:bg-pink-500 w-full h-[90px] rounded-t-full rounded-b-md shadow-lg relative">
            <div className="absolute top-6 left-5 w-[22px] h-7 bg-white dark:bg-gray-200 rounded-full">
              <div className="w-2.5 h-3 bg-slate-800 dark:bg-slate-900 rounded-full absolute bottom-1 right-1" />
            </div>
            <div className="absolute top-6 right-5 w-[22px] h-7 bg-white dark:bg-gray-200 rounded-full">
              <div className="w-2.5 h-3 bg-slate-800 dark:bg-slate-900 rounded-full absolute bottom-1 right-1" />
            </div>
          </div>
          <div className="absolute bottom-3 w-full flex justify-between px-1">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="w-[18px] h-[18px] bg-pink-400 dark:bg-pink-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        <span className="text-7xl text-[#F57C00] dark:text-orange-400 font-extrabold drop-shadow">
          4
        </span>

        {/* Dots */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 bg-[#F57C00] dark:bg-orange-400 rounded-full opacity-50"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* Pac-Man */}
        <motion.div
          className="w-20 h-20 bg-yellow-400 dark:bg-yellow-500 rounded-full shadow-lg relative"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        >
          <motion.div
            className="absolute w-full h-full bg-base-300 dark:bg-gray-900"
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
        <h1 className="text-2xl font-bold mb-2 dark:text-gray-100">
          <span className="text-4xl font-semibold">o</span>ops! This page cannot
          be found
        </h1>
        <p className="text-slate-500 dark:text-gray-400 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={"/"} className="btn myBtn rounded-lg">
            <IoArrowBack />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error_404;
