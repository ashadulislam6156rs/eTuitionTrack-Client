import React from "react";
import img from "../../assets/no-data-found.png";
import Container from "../Container/Container";
import { IoArrowBack } from "react-icons/io5";

const TutionsNotFound = () => {
  return (
    <Container className={`pt-20`}>
      <button className="btn ml-10 myBtn mt-5 text-black">
        <IoArrowBack />
        Back tuitions
      </button>
      <div className="flex flex-col -mt-5 items-center justify-center pb-10 text-center">
        {/* Image */}

        <img src={img} alt="No Data Found" className="" />

        {/* Title */}
        <h2 className="text-2xl -mt-20 md:text-3xl font-semibold text-gray-700 mb-2">
          No Tuition Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-md">
          We couldn’t find any tuition matching your search. Try changing
          keywords or filters and search again.
        </p>
      </div>
    </Container>
  );
};

export default TutionsNotFound;
