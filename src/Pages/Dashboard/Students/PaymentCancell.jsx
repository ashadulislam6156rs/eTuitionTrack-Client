import React from "react";
import { Link } from "react-router";

const PaymentCancell = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-gray-900">
      <title>Payment Cancelled | eTutionTrack</title>
      <div className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-950/50 rounded-2xl p-8 max-w-lg w-full text-center animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Oops! Your payment was not successful. Don't worry, you can try again
          or check the following tips:
        </p>

        <ul className="text-left text-gray-600 dark:text-gray-400 mb-6 list-disc list-inside space-y-2">
          <li>Check your internet connection before retrying.</li>
          <li>Ensure your payment method has sufficient balance.</li>
          <li>If the issue persists, contact our support team.</li>
        </ul>

        <Link
          to={"/dashboard/applied-tutors"}
          className="inline-block bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mb-4"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancell;
