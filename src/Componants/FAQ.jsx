import React, { useState } from "react";
import Container from "./Container/Container";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(null);
const QuestionsData = [
  {
    que: "How do I register as a student on eTuitionTrack?",
    answer: `To join eTuitionTrack, simply click on the 'Sign Up' button and provide your basic details such as name, email, and class information. 
Once registered, you can browse available tutors and request tuition sessions immediately.`,
  },
  {
    que: "Can I select tutors based on subjects and experience?",
    answer: `Yes! eTuitionTrack allows students to search for tutors by subject, class level, experience, and ratings.
You can review tutor profiles, see their availability, and select the one that suits your learning needs.`,
  },
  {
    que: "How are tuition schedules managed?",
    answer: {
      first: `Scheduling is seamless on eTuitionTrack. Once you select a tutor, you can:`,
      option: [
        "Check the tutor's available time slots",
        "Request a session at your preferred time",
        "Receive confirmation once the tutor approves your request",
      ],
      last: "This ensures both students and tutors are synchronized without any confusion.",
    },
  },
  {
    que: "Is payment secure on eTuitionTrack?",
    answer: `Absolutely. All payments are processed securely through our platform.
We offer multiple payment methods and maintain transparency so that both students and tutors can trust the system.`,
  },
  {
    que: "What support does eTuitionTrack provide after enrollment?",
    answer: {
      first: `eTuitionTrack provides continuous support to ensure a smooth learning experience. 
After enrollment, you can:`,
      option: [
        "Track your tuition progress",
        "Provide feedback on sessions",
        "Contact support for any issues",
      ],
      last: "Our dedicated support team is always ready to help students and tutors alike.",
    },
  },
];


  return (
    <Container>
      <div className="space-y-3 my-5">
        <div className="py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
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
            ? "border-[#2B8282] bg-[#E6F2F3] shadow-lg text-black"
            : "bg-base-100 border-base-300 text-gray-700"
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
          ${isOpen && click == index ? "text-teal-900 py-2" : "text-gray-800"}
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
              ? "text-gray-900 border-t border-[#C3DFE2]"
              : "text-gray-600"
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
