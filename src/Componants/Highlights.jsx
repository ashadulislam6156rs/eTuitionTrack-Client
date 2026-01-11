import React from "react";
import { motion } from "framer-motion";
import Container from "./Container/Container";

const Highlights = () => {
  const highlights = [
    {
      icon: "📱",
      title: "Mobile First Design",
      description:
        "Access your tuition management system anywhere, anytime from any device with our responsive platform.",
      color: "#0288D1",
      bgColor: "#0288D120",
    },
    {
      icon: "💰",
      title: "Automated Payments",
      description:
        "Track payments, generate invoices, and send automatic reminders to ensure timely fee collection.",
      color: "#F57C00",
      bgColor: "#F57C0020",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      description:
        "Comprehensive reports and insights to monitor student progress and identify areas for improvement.",
      color: "#0D47A1",
      bgColor: "#0D47A120",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description:
        "Stay updated with real-time alerts for classes, assignments, payments, and important announcements.",
      color: "#29B6F6",
      bgColor: "#29B6F620",
    },
    {
      icon: "👥",
      title: "Student Management",
      description:
        "Maintain detailed student profiles, attendance records, and academic history all in one place.",
      color: "#F57C00",
      bgColor: "#F57C0020",
    },
    {
      icon: "📅",
      title: "Class Scheduling",
      description:
        "Create and manage class schedules effortlessly with our intuitive calendar and scheduling tools.",
      color: "#0288D1",
      bgColor: "#0288D120",
    },
  ];

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Card animations
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Icon float animation
  const iconFloat = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-10 relative bg-[#29b5f615] overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: `radial-gradient(circle, #0288D1 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: `radial-gradient(circle, #F57C00 0%, transparent 70%)`,
          transform: "translate(50%, 50%)",
        }}
      />
      <Container className={"relative z-10"}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#0D47A1" }}
          >
            Highlights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover powerful features designed to make education management
            effortless and efficient
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden cursor-pointer group"
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${highlight.bgColor} 0%, transparent 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto relative"
                  style={{
                    background: highlight.bgColor,
                  }}
                  variants={iconFloat}
                  animate="animate"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                >
                  {highlight.icon}

                  {/* Glowing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      border: `2px solid ${highlight.color}`,
                      opacity: 0,
                    }}
                    whileHover={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.2, 1.4],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                      },
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-3 text-center"
                  style={{ color: highlight.color }}
                >
                  {highlight.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed">
                  {highlight.description}
                </p>
              </div>

              {/* Decorative corner element */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: highlight.color,
                  transform: "translate(50%, -50%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Highlights;
