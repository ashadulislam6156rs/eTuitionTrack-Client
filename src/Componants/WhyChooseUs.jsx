import React from "react";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaClock,
  FaMobileAlt,
} from "react-icons/fa";
import Container from "./Container/Container";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-[#F57C00] text-4xl mb-4" />,
      title: "Expert Tutors",
      description:
        "Learn from experienced and certified tutors who guide you step by step to achieve your goals.",
    },
    {
      icon: <FaLaptopCode className="text-[#F57C00] text-4xl mb-4" />,
      title: "Interactive Learning",
      description:
        "Engage in interactive lessons, quizzes, and assignments to ensure effective learning.",
    },
    {
      icon: <FaClock className="text-[#F57C00] text-4xl mb-4" />,
      title: "Flexible Schedule",
      description:
        "Study at your own pace with flexible schedules and 24/7 access to course materials.",
    },
    {
      icon: <FaMobileAlt className="text-[#F57C00] text-4xl mb-4" />,
      title: "Anywhere Access",
      description:
        "Learn from anywhere on any device – desktop, tablet, or mobile.",
    },
  ];

  return (
    <div className="bg-base-200">
      <Container>
        <section className="py-10 dark:bg-[#111827]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Why Choose <span className="text-[#F57C00]">eTuitionTrack</span>
            </h2>
            <p className="mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the benefits of joining eTuitionTrack. Our platform is
              designed to provide high-quality, flexible, and interactive
              learning experiences for every student.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 120}
                  data-aos-duration="800"
                  data-aos-easing="ease-out-cubic"
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="mb-4">{feature.icon}</div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
