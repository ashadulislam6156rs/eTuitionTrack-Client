import React, { useState } from "react";
import Container from "./Container/Container";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(null);
  const QuestionsData = [
    {
      que: "What is eTuitionTrack and how does it work?",
      answer: `eTuitionTrack is a tuition management platform where students, tutors, and admins manage tuition activities seamlessly. 
Students post tuition requirements, tutors apply, and admins review and approve sessions for a smooth learning experience.`,
    },
    {
      que: "How do I post a tuition requirement as a student?",
      answer: `After registering as a student, you can post your tuition needs by specifying details like class, subject, budget, location, and preferred schedule. 
This helps tutors find and apply to tuitions that match their expertise.`,
    },
    {
      que: "How can I apply as a tutor and get approved?",
      answer: {
        first: `Tutors can browse available tuition posts and apply to those that suit their skills. Once applied, the admin will:`,

        option: [
          "Review your profile and experience",
          "Verify your credentials",
          "Approve or reject your application based on suitability",
        ],
        last: "This ensures only verified tutors are connected with students for a trustworthy experience.",
      },
    },
    {
      que: "How are tuition schedules and sessions managed?",
      answer: {
        first: `Scheduling is easy with eTuitionTrack. Once a tutor is approved for a tuition, you can:`,

        option: [
          "Check the tutor's available time slots",
          "Confirm sessions according to mutual convenience",
          "Track ongoing classes and progress",
        ],
        last: "This ensures both students and tutors remain synchronized without confusion.",
      },
    },
    {
      que: "Is payment secure on eTuitionTrack?",
      answer: `Yes! All payments are securely processed through the platform. 
The system ensures transparency for students and tutors with clear payment tracking, receipts, and multiple supported methods.`,
    },
    {
      que: "How can admins monitor and manage the platform?",
      answer: {
        first: `Admins have a dashboard to oversee all activities. They can:`,

        option: [
          "Approve or reject tutor applications and tuition posts",
          "Track payments and financial records",
          "Monitor student-tutor communication and system activity",
        ],
        last: "This ensures the platform runs smoothly and maintains high-quality educational standards.",
      },
    },
  ];

  return (
    <Container>
      <div className="space-y-3 my-5">
        <div className="py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto text-base md:text-lg">
            Find answers to the most common questions about eTuitionTrack,
            including student registration, tutor selection, scheduling, secure
            payments, and ongoing support.
          </p>
        </div>

        <div className="space-y-2">
          {QuestionsData.map((data, index) => (
            <div
              key={index}
              tabIndex={0}
              className={`
        collapse collapse-arrow border rounded-xl transition-all duration-300 p-4
        ${
          isOpen && click == index
            ? "border-[#fdf7e4] dark:border-orange-500 bg-[#f57b001c] dark:bg-orange-900/20 shadow-lg text-black dark:text-gray-100"
            : "bg-base-100 dark:bg-gray-800 border-base-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
        }
      `}
              onClick={() => {
                setIsOpen(true);
                setClick(index);
              }}
            >
              {/* Title */}
              <div
                className={`
          collapse-title font-semibold transition-colors p-0 duration-300
          ${
            isOpen && click == index
              ? "text-teal-900 dark:text-orange-300 py-2"
              : "text-gray-800 dark:text-gray-200"
          }
        `}
              >
                {data.que}
              </div>

              {/* Content */}
              <div
                className={`
          collapse-content text-sm p-0 py-2 mr-5 transition-all duration-300
          ${
            isOpen && click == index
              ? "text-gray-900 dark:text-gray-200 border-t border-[#C3DFE2] dark:border-orange-500/30"
              : "text-gray-600 dark:text-gray-400"
          }
        `}
              >
                {typeof data.answer === "string" ? (
                  <p>{data.answer}</p>
                ) : (
                  <>
                    <p>{data.answer.first}</p>
                    <ul className="list-disc ml-5 my-2">
                      {data.answer.option.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p>{data.answer.last}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
