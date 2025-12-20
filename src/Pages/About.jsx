import React from "react";
import { FaArrowRight, FaCog, FaHeadset, FaCloud } from "react-icons/fa";
import OurTeam from "./OurTeam";
import OurProcess from "./OurProcess";
import { Link } from "react-router";

const PRIMARY_COLOR = "#0288D1";
const BACKGROUND_LIGHT = "#F9F9F9";

const About = () => {
  return (
    <div className="font-sans bg-white dark:bg-gray-900 transition-colors duration-500">
      {/*  Hero Section */}
      <title>About Us | eTutionTrack</title>
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="About eTuitionTrack"
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-5 items-center text-white">
          <div className="max-w-xl p-6 md:p-0">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight pt-10 md:pt-3 mb-6">
              About <span className="block text-[#F57C00]">eTuitionTrack</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              eTuitionTrack is a smart tuition management platform that connects
              students, tutors, and guardians through a modern and transparent
              system. Our goal is to make tuition tracking simple, reliable, and
              efficient for everyone.
            </p>
            <Link to={"/contact"} className="myBtn-outlet btn">
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section (Consistent Padding) */}
      <section className="py-10" style={{ backgroundColor: BACKGROUND_LIGHT }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-10">
            <span
              style={{ color: PRIMARY_COLOR }}
              className="text-sm font-extrabold uppercase tracking-widest"
            >
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FaCog />}
              title="Smart Tuition Management"
              text="Manage tuition requests, approvals, schedules, and payments in one centralized platform."
            />
            <ServiceCard
              icon={<FaHeadset />}
              title="24/7 Support"
              text="Our support team is always available to help students and tutors with any issues."
            />
            <ServiceCard
              icon={<FaCloud />}
              title="Cloud Based System"
              text="Access your tuition data securely anytime, anywhere with our cloud-based infrastructure."
            />
          </div>
        </div>
      </section>

      {/* Our Team (Section Wrapper) */}
      <section>
        <OurTeam />
      </section>

      {/* Our Process (Integrated Component) */}
      <OurProcess />

      <section className="py-10" style={{ backgroundColor: BACKGROUND_LIGHT }}>
        <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center gap-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full">
            <div
              className="w-60 h-60 rounded-full border-[18px] border-gray-100 flex flex-col items-center justify-center bg-white shadow-2xl transition-all duration-500 hover:scale-105"
              style={{ borderColor: PRIMARY_COLOR + "20" }}
            >
              <span
                className="text-6xl font-bold"
                style={{ color: PRIMARY_COLOR }}
              >
                5+
              </span>
              <span className="text-sm font-semibold text-gray-700">Years</span>
              <span className="text-xs text-gray-500">Experience</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 text-center">
              <Stat value="2K+" label="Students" />
              <Stat value="500+" label="Tutors" />
              <Stat value="1K+" label="Successful Tuitions" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Subcomponents ---

const ServiceCard = ({ icon, title, text }) => (
  <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner"
      style={{ backgroundColor: PRIMARY_COLOR + "20", color: PRIMARY_COLOR }}
    >
      {icon}
    </div>
    <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-base">{text}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="p-4">
    <span className="text-5xl font-extrabold text-gray-900 block mb-1">
      {value}
    </span>
    <p className="text-xl font-medium text-gray-600">{label}</p>
  </div>
);


export default About;
