import React from "react";
import img from "../../assets/no-data-found.png";
import Container from "../Container/Container";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";

const TutionsNotFound = () => {
  return (
    <Container className={`pt-20`}>
      <Link to={"/tuitions"} className="btn ml-10 myBtn mt-5 text-black">
        <IoArrowBack />
        Back tuitions
      </Link>
      <div className="flex flex-col -mt-10 items-center justify-center pb-10 text-center">
        {/* Image */}

        <img src={img} alt="No Data Found" />

        {/* Title */}
        <h2 className="text-3xl -mt-20 md:text-4xl font-bold text-gray-700 mb-2">
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
