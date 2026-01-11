import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const PRIMARY_COLOR = "#0288D1";

const TeamCard = ({ member }) => {
  const { name, role, img } = member;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-950/50 hover:shadow-2xl dark:hover:shadow-gray-950/70 transition-all duration-500 overflow-hidden group text-center border border-slate-100 dark:border-gray-700 p-6 md:p-8">
      {/* Image Container with Hover Effect */}
      <div className="relative w-full mb-6">
        {/* Image Wrapper */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto shadow-xl border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:border-4 group-hover:shadow-2xl dark:group-hover:shadow-gray-950/70">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Social Icons Overlay - Hidden by default, shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-center gap-2">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-[#0288D1] dark:text-blue-400 hover:bg-slate-800 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white flex items-center justify-center transition shadow-md dark:shadow-gray-950/50"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-[#0288D1] dark:text-blue-400 mb-1 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-slate-500 dark:text-gray-400 font-medium mb-4">
        {role}
      </p>
    </div>
  );
};

export default TeamCard;
