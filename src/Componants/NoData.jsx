import React from "react";
import Container from "./Container/Container";

const NoData = () => {
  return (
    <Container className={`p-6`}>
      <div className="flex flex-col gap-3 items-center justify-center text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          No Data Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
          No data is available to display at the moment. This may be because no
          records match any results. Please try again later.
        </p>
      </div>
    </Container>
  );
};

export default NoData;
