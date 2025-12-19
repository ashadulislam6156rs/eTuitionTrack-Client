import React from "react";
import { FaXTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../Container/Container";
import { Link } from "react-router";
import logo from "../../assets/eTuitionTrack-logo.png";

const Footer = () => {
  return (
    <Container>
      <footer className=" dark:bg-background-dark text-gray-600 dark:text-gray-400 overflow-hidden">
        <div className="pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link to={"/"} className="w-30 h-10">
                <img className="w-30 h-10" src={logo} alt="website logo" />
              </Link>
              <p className="text-sm pt-2">
                Empower your educational journey with{" "}
                <span className="text-[#F57C00] font-bold">eTuitionTrack</span>{" "}
                a modern, scalable platform designed to simplify tuition
                management for institutes, tutors, and students alike. From
                scheduling classes and tracking payments to managing academic
                progress, our solution brings clarity, efficiency, and growth to
                every step of the learning process.
              </p>
            </div>

            {/* Spacer */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Navigation Links */}
            <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              {/* Useful Links */}
              <div>
                <h3 className="font-bold text-[#0D47A1] dark:text-gray-300 mb-4 tracking-wide">
                  Useful Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to={"/"}
                      className="hover:text-[#F57C00] hover:underline dark:hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about"}
                      className="hover:text-[#F57C00] hover:underline  dark:hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/contact"}
                      className="hover:text-[#F57C00] hover:underline  dark:hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-bold text-[#0D47A1] dark:text-gray-300 mb-4 tracking-wide">
                  Solutions
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to={"/privacy"}
                      className="hover:text-[#F57C00] hover:underline  dark:hover:text-white transition-colors"
                    >
                      Privacy And Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/conditions"}
                      className="hover:text-[#F57C00] hover:underline  dark:hover:text-white transition-colors"
                    >
                      Terms And Conditions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="">
                <h3 className="font-bold text-[#0D47A1] dark:text-gray-300 mb-4 tracking-wide">
                  Contact Info
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <FaEnvelope
                      className="text-gray-500 dark:text-gray-300 w-4 h-4"
                      aria-hidden="true"
                    />
                    <a
                      href="mailto:support@etuitiontrack.com"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      support@etuitiontrack.com
                    </a>
                  </li>

                  <li className="flex items-center gap-2">
                    <FaPhone
                      className="text-gray-500 dark:text-gray-300 w-4 h-4"
                      aria-hidden="true"
                    />
                    <a
                      href="tel:+880123456789"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      +880 1234 56789
                    </a>
                  </li>

                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      className="text-gray-500 dark:text-gray-300 w-4 h-4"
                      aria-hidden="true"
                    />
                    <span>Mymensingh, Bangladesh</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright and Social Icons */}
          <div className="bg-[#0d48a1e8] dark:bg-primary/20 rounded-full py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white font-semibold dark:text-gray-300">
              Copyright © 2025 eTuitionTrack
            </p>
            <div className="flex items-center space-x-2">
              {/* X (Twitter) Icon */}
              <a
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                href="https://x.com/"
              >
                <FaXTwitter className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">X (formerly Twitter)</span>
              </a>

              {/* Instagram Icon */}
              <a
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                href="https://www.instagram.com"
              >
                <FaInstagram className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>

              {/* Facebook Icon */}
              <a
                className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                href="https://www.facebook.com"
              >
                <FaFacebookF className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
