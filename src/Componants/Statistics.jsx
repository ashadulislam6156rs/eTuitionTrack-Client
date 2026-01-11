import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Container from "./Container/Container";

const Statistics = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      number: 5000,
      suffix: "+",
      label: "Active Students",
      icon: "👨‍🎓",
      color: "#0288D1",
    },
    {
      number: 500,
      suffix: "+",
      label: "Expert Teachers",
      icon: "👨‍🏫",
      color: "#F57C00",
    },
    {
      number: 1000,
      suffix: "+",
      label: "Happy Parents",
      icon: "👨‍👩‍👧",
      color: "#0D47A1",
    },
    {
      number: 95,
      suffix: "%",
      label: "Success Rate",
      icon: "🎯",
      color: "#29B6F6",
    },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  /* 🔍 Intersection Observer (repeat safe) */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCounters(stats.map(() => 0)); // reset only
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* 🔢 Counter animation (repeat) */
  useEffect(() => {
    if (!isVisible) return;

    const timers = [];

    stats.forEach((stat, index) => {
      let start = 0;
      const increment = stat.number / 120;

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.number) {
          setCounters((prev) => {
            const next = [...prev];
            next[index] = stat.number;
            return next;
          });
          clearInterval(timer);
        } else {
          setCounters((prev) => {
            const next = [...prev];
            next[index] = Math.floor(start);
            return next;
          });
        }
      }, 16);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, [isVisible]);

  /* 🎬 Motion Variants (unchanged content) */
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const gridVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-10 bg-[#0289d111]"
      variants={sectionVariant}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <Container>
        {/* Section Header */}
        <motion.div className="text-center mb-7" variants={cardVariant}>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#0D47A1" }}
          >
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their
            educational journey with eTuitionTrack
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                style={{
                  background: stat.color,
                  transform: "translate(30%, -30%)",
                }}
              />

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto"
                style={{ background: `${stat.color}20` }}
              >
                {stat.icon}
              </div>

              <div className="text-center">
                <h3
                  className="text-5xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {counters[index].toLocaleString()}
                  {stat.suffix}
                </h3>
                <p className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: stat.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridVariant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {[
            {
              bg: "#0288D120",
              icon: "📚",
              title: "Comprehensive Courses",
              color: "#0288D1",
              text: "Access to wide range of subjects and learning materials",
            },
            {
              bg: "#F57C0020",
              icon: "⚡",
              title: "Real-time Tracking",
              color: "#F57C00",
              text: "Monitor progress, attendance, and performance instantly",
            },
            {
              bg: "#0D47A120",
              icon: "🏆",
              title: "Proven Results",
              color: "#0D47A1",
              text: "Students achieve their academic goals consistently",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="text-center p-6 rounded-xl"
              style={{ background: item.bg }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: item.color }}
              >
                {item.title}
              </h4>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Statistics;
