import React from "react";
import { RotateLoader } from "react-spinners";
import Container from "../Container/Container";

const Loading = () => {
  return (
    <Container>
      <div className="min-h-screen flex justify-center items-center">
        <RotateLoader color="#fd7d07"></RotateLoader>
      </div>
    </Container>
  );
};

export default Loading;
