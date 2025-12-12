import React from "react";
import { FaUserGraduate, FaBookOpen, FaCertificate } from "react-icons/fa";
import Container from "./Container/Container";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUserGraduate className="text-4xl text-[#F57C00]" />,
      title: "Create Your Account",
      desc: "Sign up easily using your email to get started with eTuitionTrack.",
    },
    {
      icon: <FaBookOpen className="text-4xl text-[#F57C00]" />,
      title: "Enroll in Subjects",
      desc: "Choose your class subjects, access notes, videos, and study materials.",
    },
    {
      icon: <FaCertificate className="text-4xl text-[#F57C00]" />,
      title: "Track Your Progress",
      desc: "Monitor learning progress through assignments, quizzes & analytics.",
    },
  ];

  return (
    <div className="bg-base-200">
      <Container>
        <section className="py-5 dark:bg-[#0f172a] font-display">
          <div className="mx-auto">
            {/* SECTION TITLE */}
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
              How the Platform Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Only three simple steps to start your learning journey with
              eTuitionTrack.
            </p>

            {/* 3-STEP GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all"
                >
                  <div className="flex justify-center mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
