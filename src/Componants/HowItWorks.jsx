import React from "react";
import { FaPlusCircle, FaClipboardCheck, FaTasks } from "react-icons/fa";
import Container from "./Container/Container";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaPlusCircle className="text-4xl text-[#F57C00]" />,
      title: "Post Your Tuition Requirement",
      desc: "Students register and post tuition needs including class, subject, budget, schedule, and location.",
    },
    {
      icon: <FaClipboardCheck className="text-4xl text-[#F57C00]" />,
      title: "Apply or Approve Tuitions",
      desc: "Tutors browse available tuitions and apply, while admins review applications and approve or reject them.",
    },
    {
      icon: <FaTasks className="text-4xl text-[#F57C00]" />,
      title: "Track and Manage",
      desc: "Admins monitor all activities, students and tutors track class progress, payments, and communication seamlessly.",
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
              A simple workflow to manage tuitions for students, tutors, and
              admins efficiently.
            </p>

            {/* 3-STEP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  data-aos="flip-up"
                  data-aos-delay={index * 150}
                  data-aos-duration="900"
                  data-aos-easing="ease-out-cubic"
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
