import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GrView } from "react-icons/gr";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const PaymentsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [currentPayment, setCurrentPayment] = useState({});

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
  });

  const formatBDTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      hour12: true,
    });
  };

  const handlePaymentDetails = (payment) => {
    setCurrentPayment(payment);
    modalRef.current.showModal();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <title>My Payment History | eTutionTrack</title>
      <h1 className="text-3xl font-bold text-center pt-5">
        My Payment History: ({payments?.length})
      </h1>
      <p className="text-sm text-center text-base-content/60 pb-7 pt-2">
        All your tuition payment records, including transaction details and
        status, are listed here for easy tracking.
      </p>
      <div>
        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th>SL.NO.</th>
                <th>Payment Time</th>
                <th>Transaction Id</th>
                <th>Payment Info</th>
                <th>Currency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10">
                    <NoData />
                  </td>
                </tr>
              ) : (
                payments?.map((Payment, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{formatBDTime(Payment.paidAt)}</td>
                    <td>{Payment.transactionId}</td>
                    <td>
                      <span>{Payment.totalAmount}</span>
                      <span className="text-xl">৳</span>
                      <span className="text-green-600 font-semibold">
                        {" "}
                        ({Payment.paymentStatus})
                      </span>
                    </td>
                    <td>{Payment.currency.toUpperCase()}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handlePaymentDetails(Payment)}
                        title="View Payment Details"
                        className="btn bg-[#0D47A1] hover:bg-transparent hover:text-black text-white btn-square btn-sm"
                      >
                        <GrView />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box p-6 sm:p-8 rounded-xl bg-white shadow-lg max-w-lg">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {currentPayment?.customerEmail || "No Name"}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentPayment?.studentEmail}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Total Paid</p>
                <p>{currentPayment?.totalAmount || "-"} BDT</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Paid Time</p>
                <p>{formatBDTime(currentPayment?.paidAt) || "-"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Transaction Id</p>
                <p className="text-[11px]">
                  {currentPayment?.transactionId || "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Payment Status</p>
                <p className=" font-semibold text-cyan-500 w-fit rounded-lg px-2">
                  {currentPayment?.paymentStatus || "-"}
                </p>
              </div>
            </div>

            {/* Details */}
            {currentPayment?.details && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="font-semibold text-gray-600 mb-1">Details</p>
                <p className="text-gray-700 text-sm">
                  {currentPayment.details}
                </p>
              </div>
            )}

            {/* Close Button */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary w-full">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default PaymentsHistory;
