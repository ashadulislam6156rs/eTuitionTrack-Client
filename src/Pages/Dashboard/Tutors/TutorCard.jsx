import React from "react";
import { motion } from "framer-motion";

const TutorCard = ({ tutor }) => {
  const { fullName, photoURL, email, contactNumber } = tutor || {};

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -4,
          boxShadow: "0px 12px 25px rgba(0,0,0,0.12)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="
          bg-white shadow-md rounded-xl p-5 
          cursor-pointer border border-transparent 
          hover:border-[#CAEB66] transition-all duration-300
        "
      >
        {/* Image */}
        <div className="flex justify-center">
          <motion.img
            src={photoURL}
            alt={fullName}
            className="w-24 h-24 object-cover rounded-full border"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </div>

        {/* Info */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{fullName}</h2>
          <p className="text-sm text-gray-500">{email}</p>

          <p className="mt-1 text-sm">
            Contact: <span className="font-semibold">{contactNumber}</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TutorCard;
