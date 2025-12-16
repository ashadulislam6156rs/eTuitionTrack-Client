import React, { useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";

const PRIMARY_BLUE = "#0288D1";
const DEEP_BLUE = "#0D47A1";



const ContactInput = (props) => (
  <input
    {...props}
    className="w-full px-5 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
    style={{ focusRingColor: PRIMARY_BLUE }}
  />
);

const ContactTextarea = (props) => (
  <textarea
    {...props}
    className="w-full px-5 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
    style={{ focusRingColor: PRIMARY_BLUE }}
  />
);

const Contact = () => {
  useEffect(() => {
   
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <section className="w-full font-sans text-slate-700 dark:text-slate-300 transition-colors duration-500">
      <section className="relative py-24 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80')`,
          }}
        ></div>

        {/* Optional Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-white/90">
            Let’s talk about your idea, project, or business growth. We are
            ready to answer your questions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FiMail />,
              title: "Email Address",
              lines: ["hello@etuitiontrack.com", "support@etuitiontrack.com"],
            },
            {
              icon: <FiPhone />,
              title: "Phone Number",
              lines: ["+880 1700-000000", "+880 1800-000000"],
            },
            {
              icon: <FiMapPin />,
              title: "Office Location",
              lines: ["Mymensingh, Bangladesh", "Dhaka, Bangladesh"],
            },
            {
              icon: <FiClock />,
              title: "Working Hours",
              lines: ["Sun – Thu: 9AM – 5PM", "Sat: 9AM – 3PM (GMT+6)"],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 text-center transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.02]"
              style={{ borderTop: `4px solid ${PRIMARY_BLUE}` }}
            >
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: PRIMARY_BLUE + "20",
                  color: PRIMARY_BLUE,
                }}
              >
                {item.icon}
              </div>
              <h3 className="font-extrabold text-xl text-slate-800 dark:text-white mb-2">
                {item.title}
              </h3>
              {item.lines.map((l, idx) => (
                <p
                  key={idx}
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Form Content */}
          <div>
            <span
              className="font-bold uppercase text-sm tracking-widest"
              style={{ color: PRIMARY_BLUE }}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <ContactInput placeholder="Your Name" />
                <ContactInput type="email" placeholder="Email Address" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ContactInput placeholder="Phone Number" />
                <ContactInput placeholder="Subject" />
              </div>
              <ContactTextarea rows="6" placeholder="Write your message..." />

              <button className="myBtn w-full btn">
                <FiSend /> Send Message
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Team discussion"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white dark:border-slate-800"
            />
          </div>
        </div>
      </section>

      {/* 4. Map Section */}
      <section className="max-w-7xl mx-auto px-6 py-7">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Find Our Office Location
        </h2>
        <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
          <iframe
            title="Mymensingh Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3623.3649290800945!2d90.383971!3d24.748674!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564f19bdffb0d3%3A0xe64dac6c9ade19d8!2z4Ka44KeC4Kaw4KeN4Kav4Kau4KeB4KaW4KeAIOCmleCni-Cnn-CmvuCmn-CmvuCmsA!5e0!3m2!1sen!2sus!4v1765900129028!5m2!1sen!2sus"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </section>
  );
};

export default Contact;
