import React, { useState } from "react";
import Container from "./Container/Container";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [click, setClick] = useState(null);
  const QuestionsData = [
    {
      que: " How does this posture corrector work?",
      answer: `A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here's how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.`,
    },
    {
      que: "Is it suitable for all ages and body types?",
      answer: `Yes! Our posture corrector is designed with an adjustable and flexible strap system, making it suitable for most ages and body types.
It can be comfortably worn by teens, adults, and seniors.
However, for children under 12 or individuals with medical conditions, we recommend consulting a doctor before use.`,
    },
    {
      que: "Does it really help with back pain and posture improvement?",
      answer: {
        first: `Absolutely.
The device is engineered to gently align your spine and shoulders, reducing slouching and supporting proper posture.
Consistent use can help:`,
        option: [
          "Reduce back and shoulder pain",
          "Improve posture",
          "Promote natural spinal alignment",
        ],
        last: "Many users report noticeable improvements within 1-2 weeks of regular use.",
      },
    },
    {
      que: "Does it have smart features like vibration alerts?",
      answer: `Yes, our advanced model includes smart vibration reminders that activate whenever you start slouching.
This helps you stay aware of your posture throughout the day without discomfort.
If you prefer a simple version, we also offer a non-vibration model.`,
    },
    {
      que: "How will I be notified when the product is back in stock?",
      answer: {
        first: `You can simply click the “Notify Me” button on the product page and enter your email or phone number.
Once the item is restocked, you’ll automatically receive:`,
        option: [
          "Instant email notification, or",
          "SMS alert (if you provided a phone number)",
        ],
        last: "This ensures you never miss the chance to grab the product.",
      },
    },
  ];

  return (
    <Container>
      <div className="space-y-3 my-5">
        <h1 className="text-3xl font-bold text-center">
          Frequently Asked Question (FAQ)
        </h1>
        <p className="text-gray-500 text-center w-4/6 mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

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
