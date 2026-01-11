import React from "react";
import Reveal from "../../../Componants/Animation/Reveal";

const TutorCard = ({ tutor }) => {
  const { fullName, photoURL, email, contactNumber } = tutor || {};

  return (
    <Reveal>
      <div
        className="
          bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 rounded-xl p-5 
          cursor-pointer border border-transparent dark:border-gray-700
          hover:border-[#CAEB66] dark:hover:border-lime-400 transition-all duration-300
        "
      >
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={photoURL}
            alt={fullName}
            className="w-24 h-24 object-cover rounded-full border dark:border-gray-600"
          />
        </div>

        {/* Info */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold dark:text-gray-100">
            {fullName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>

          <p className="mt-1 text-sm dark:text-gray-300">
            Contact:{" "}
            <span className="font-semibold dark:text-gray-200">
              {contactNumber}
            </span>
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export default TutorCard;
