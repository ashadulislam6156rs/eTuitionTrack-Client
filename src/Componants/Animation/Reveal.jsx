import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Reveal = ({ children }) => {

     useEffect(() => {
       AOS.init({
         duration: 900,
         once: false,
         easing: "ease-in-out",
       });
     }, []);
    
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="120"
      data-aos-delay="70"
      data-aos-duration="900"
    >
      {children}
    </div>
  );
};

export default Reveal;
