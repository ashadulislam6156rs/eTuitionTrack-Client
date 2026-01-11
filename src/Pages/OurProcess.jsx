import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRegCalendarCheck,
  FaMoneyCheckAlt,
  FaSmile,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const steps = [
  {
    number: "01",
    icon: <FaUserGraduate size={28} />,
    title: "Student Registration",
    description:
      "Students create an account and provide basic details to join eTuitionTrack and access available tutors.",
  },
  {
    number: "02",
    icon: <FaChalkboardTeacher size={28} />,
    title: "Tutor Selection",
    description:
      "Students can browse and select verified tutors based on subjects, experience, and ratings.",
  },
  {
    number: "03",
    icon: <FaRegCalendarCheck size={28} />,
    title: "Schedule & Approval",
    description:
      "Tutors and students coordinate schedules, and tuition requests are approved seamlessly through the platform.",
  },
  {
    number: "04",
    icon: <FaMoneyCheckAlt size={28} />,
    title: "Secure Payment",
    description:
      "Payments are handled safely within the platform ensuring transparency for both students and tutors.",
  },
  {
    number: "05",
    icon: <FaSmile size={28} />,
    title: "Ongoing Support",
    description:
      "eTuitionTrack provides continuous support, feedback management, and progress tracking for a smooth experience.",
  },
];

const OurProcess = () => {
  return (
    <section className="py-10 bg-[#F9F9F9] dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Our Process
          </h2>
          <div className="w-20 h-1 bg-[#0288D1] dark:bg-blue-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A step-by-step guide to how students and tutors experience
            eTuitionTrack, designed for simplicity and efficiency.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="process-swiper"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {steps.map((step, idx) => (
            <SwiperSlide key={idx} className="pb-5 my-5">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-950/50 flex flex-col items-center text-center transition-all hover:shadow-2xl dark:hover:shadow-gray-950/70 hover:scale-[0.95] duration-500 min-h-[350px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#0288D1] dark:bg-blue-500 text-white font-bold text-lg shadow-lg border-4 border-[#F9F9F9] dark:border-gray-900">
                  {step.number}
                </div>

                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#0288D1] dark:bg-blue-600 text-white mb-6 shadow-2xl dark:shadow-blue-900/50 mt-4">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {step.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style>{`
        .process-swiper .swiper-pagination-bullet {
          background: #0288D1;
          opacity: 0.4;
        }
        .process-swiper .swiper-pagination-bullet-active {
          background: #0288D1;
          opacity: 1;
        }
        
        html[data-theme="dark"] .process-swiper .swiper-pagination-bullet {
          background: #60A5FA;
          opacity: 0.5;
        }
        html[data-theme="dark"] .process-swiper .swiper-pagination-bullet-active {
          background: #3B82F6;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default OurProcess;
