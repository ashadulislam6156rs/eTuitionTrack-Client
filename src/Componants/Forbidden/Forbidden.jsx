import React from "react";
import { Link } from "react-router";
import ForbiddenImage from "../../assets/403-Access-Denied.png";
import { FiArrowUpLeft } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="p-5 rounded-lg mx-auto bg-white">
      {/* Image Section */}
      <div className="w-full flex justify-center items-center h-auto">
        <img
          src={ForbiddenImage}
          alt="Forbidden Access"
          className="w-auto md:h-[500px]"
        />
      </div>

      {/* Text & Action Section */}
      <div className="">
        <h1 className="text-4xl text-center font-extrabold mb-2">
          We are Sorry ...
        </h1>
        {/* <h2 className="text-2xl font-semibold mb-4">Forbidden Access</h2> */}
        <p className="text-gray-500 md:w-2/6 mx-auto text-center mb-6">
          The page you're trying to access has restricted access. Please refer
          to your system administrator
        </p>
        <div className="flex justify-center items-center">
          <Link to="/" className="myBtn btn rounded-lg">
            <FiArrowUpLeft />
             Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
