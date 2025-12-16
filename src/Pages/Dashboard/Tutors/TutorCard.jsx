import React from "react";
import Reveal from "../../../Componants/Animation/Reveal";


const TutorCard = ({ tutor }) => {
  const { fullName, photoURL, email, contactNumber } = tutor || {};

  return (
    <Reveal>
      <div
        className="
          bg-white shadow-md rounded-xl p-5 
          cursor-pointer border border-transparent 
          hover:border-[#CAEB66] transition-all duration-300
        "
      >
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={photoURL}
            alt={fullName}
            className="w-24 h-24 object-cover rounded-full border"
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
      </div>
    </Reveal>
  );
};

export default TutorCard;
