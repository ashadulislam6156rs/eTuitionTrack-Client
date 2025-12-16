import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const PRIMARY_COLOR = "#0288D1";

const TeamCard = ({ member }) => {
    
      const { name, role, img } = member;
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group text-center border border-slate-100 p-6 md:p-8">
        {/* Image Container with Hover Effect */}
        <div className="relative w-full mb-6">
          {/* Image Wrapper */}
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto shadow-xl border-4 border-white transition-all duration-500 group-hover:border-4 group-hover:shadow-2xl">
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
                  className="w-8 h-8 rounded-full bg-white text-slate-800 hover:bg-slate-800 hover:text-white flex items-center justify-center transition shadow-md"
                  style={{
                    borderColor: PRIMARY_COLOR,
                    color: PRIMARY_COLOR,
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <h3
          className="text-xl font-extrabold text-slate-900 mb-1 transition-colors"
          style={{ color: PRIMARY_COLOR }}
        >
          {name}
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-4">{role}</p>

       
      </div>
    );
};

export default TeamCard;