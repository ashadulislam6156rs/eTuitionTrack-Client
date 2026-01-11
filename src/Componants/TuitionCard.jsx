import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdLocationPin, MdSchedule, MdAttachMoney } from "react-icons/md";
import { Link } from "react-router";
import Reveal from "./Animation/Reveal";

const TuitionCard = ({ tuition }) => {
  const { budget, className, location, scheduleTime, subject, subjectImage } =
    tuition || {};
  return (
    <Reveal>
      <div className="card bg-base-100 dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-all duration-300 rounded-xl overflow-hidden border border-base-300 dark:border-gray-700">
        {/* Image */}
        <figure className="relative h-50 w-full">
          <img
            src={subjectImage}
            alt={subject}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Content */}
        <div className="card-body p-4">
          {/* Subject + Class */}
          <h2 className="card-title text-lg text-[#F57C00] dark:text-orange-400 font-bold">
            {subject}
          </h2>

          {/* Location */}
          <p className="flex items-center gap-2 text-sm text-base-content/70 dark:text-gray-300">
            <MdLocationPin className="text-lg" />
            {location}
          </p>

          {/* Schedule */}
          <p className="flex items-center gap-2 text-sm text-base-content/70 dark:text-gray-300">
            <MdSchedule className="text-lg" />
            {scheduleTime}
          </p>

          {/* Budget + price */}
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400">
              <FcMoneyTransfer className="text-lg" />
              {budget}
              <span className="font-bold text-xl -ml-1">৳</span>
            </p>

            <span className="badge badge-soft badge-primary dark:bg-blue-900 dark:text-blue-200 font-semibold">
              {className}
            </span>
          </div>

          {/* Button */}
          <div className="card-actions justify-end mt-4">
            <Link
              to={`/tuition-details/${tuition?._id}`}
              className="myBtn btn w-full btn-sm"
            >
              <FaRegEye />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default TuitionCard;
