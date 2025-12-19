import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { FaRocket } from "react-icons/fa6";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    user ? navigate("/tuitions") : navigate("/register");
  };

  
  const textParent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const textChild = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };


  const float = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="bg-base-300 pt-3 md:pt-0">
      <Container>
        <section className="font-display dark:bg-[#111827] md:h-[450px] flex items-center justify-center overflow-hidden">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <motion.div
              variants={textParent}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              <motion.h1
                variants={textChild}
                className="text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Manage Your Tuition System Smarter with
                <span className="text-[#F57C00] text-2xl md:text-4xl block pt-4">
                  <Typewriter
                    options={{
                      strings: ["eTuitionTrack"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={textChild}
                className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300"
              >
                A complete solution for tutors, coaching centers, and students.
                Track classes, automate payments, and monitor progress-all from
                one dashboard.
              </motion.p>

              <motion.div
                variants={textChild}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={handleClick}
                  className="myBtn btn"
                >
                  <FaRocket />
                  Get Started
                </motion.button>

                <Link to={"/tuitions"} className="myBtn-outlet btn">
                  <FaPlayCircle className="text-2xl inline-block" />
                  Watch Tuitions
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex justify-center scale-90 sm:scale-100"
            >
              <div className="relative w-full max-w-sm">
                {/* BACK SHAPE FLOAT */}
                <motion.div
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-amber-200 dark:bg-amber-800 rounded-2xl -rotate-3"
                />

                {/* MAIN IMAGE PARALLAX */}
                <motion.img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQrEX8Zquxjo6IbqbljdXxFBvRpwrPQtk3_3tMjHLzcSABlOUlclfAHLgyduDHhXNxFWTM5X890Ko1ocgKFH6hQa2EzqNyumYTMBiJLUj4zAp47M4VTul0zx86WzQt25U8L_9kToL5Ye24gdq6kbUIflh-aQbbgxHYMUxs8P218Y8k7FEltqwmKC92nJbTivw16lCvLb04Rz1GBZlvxT1kbhb5MQpk1Hf6Gd6PRVDblopDTQagYsODZYRCSYxDHIwbdJE_J5d0jwAV"
                  alt="Student holding book"
                  className="relative w-full rounded-2xl z-10 object-cover h-[360px]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120 }}
                />

                {/* BADGE 1 FLOAT */}
                <motion.div
                  variants={float}
                  animate="animate"
                  className="absolute -top-6 -right-6 md:top-6 md:-right-10 z-20 p-2 lg:p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50 min-w-[180px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 lg:w-10 lg:h-10 h-6 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <MdSchool className="text-blue-500 dark:text-blue-300 text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        500+
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Active Tutors
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* BADGE 2 FLOAT */}
                <motion.div
                  variants={float}
                  animate="animate"
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 md:bottom-6 md:-left-10 z-20 lg:p-4 p-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50 lg:min-w-[200px] min-w-[100px]"
                >
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      8k+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Registered Students
                    </p>
                  </div>

                  <div className="flex items-center">
                    {[1, 2, 3].map((n) => (
                      <img
                        key={n}
                        src={`https://i.pravatar.cc/50?img=${n}`}
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 -ml-2 first:ml-0"
                      />
                    ))}

                    <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 -ml-2 bg-gray-200 dark:bg-gray-600">
                      <span className="text-[10px] font-bold text-gray-600 dark:text-gray-200">
                        +5
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Banner;
