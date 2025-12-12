import React from "react";

const TutorCard = ({ tutor }) => {
    const { fullName, photoURL, email, contactNumber } = tutor || {};
    
    

  return (
    <div className="p-4">
      <div
        className="
          bg-white shadow-md rounded-xl p-5 
          hover:shadow-xl hover:-translate-y-1 
          transition-all duration-300 cursor-pointer
          border border-transparent hover:border-[#CAEB66]
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

        {/* Button */}
        {/* <div className="flex justify-center mt-4">
          <button
            className="
              px-4 py-2 rounded-lg text-sm font-medium 
              bg-[#CAEB66] hover:bg-[#b8db55] 
              transition-all duration-200
            "
          >
            View Profile
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TutorCard;
