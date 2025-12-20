import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Confetti from "react-confetti";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(() => toast.success("Payment marked successful"))
        .catch((err) => toast.error("Payment error: " + err));
    }
  }, [sessionId, axiosSecure]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center relative p-5 ">
      <title>Payment Success | eTutionTrack</title>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="bg-white p-10 rounded-2xl text-center shadow-2xl max-w-md w-full">
        <h1 className="text-4xl mb-5 text-green-500 font-bold">
          🎉 Payment Successful! 🎉
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <Link to="/" className="btn myBtn rounded-lg">
          <IoArrowBack />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
