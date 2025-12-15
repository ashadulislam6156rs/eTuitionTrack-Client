import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ReportsAnalytics = () => {

    const axiosSecure = useAxiosSecure();

    const { data: paymentsHistory = [] } = useQuery({
      queryKey: ["payment-history"],
      queryFn: async () => {
        const res = await axiosSecure.get("/payment-history");
        return res.data;
      },
    });
    const { data: paymentsPending = [] } = useQuery({
      queryKey: ["tuition-requests"],
      queryFn: async () => {
        const res = await axiosSecure.get("/tuition-requests");
        return res.data;
      },
    });

   

    const totalPending = paymentsPending.filter(
      (payment) => payment.tutorRequestStatus === "Pending"
    );
    const totalPaid = paymentsHistory.filter(
      (payment) => payment.paymentStatus === "paid"
    );

    const totalEarnings = totalPaid.reduce(
      (sum, item) => sum + Number(item.totalAmount),
      0
    );

     const formatBDTime = (dateString) => {
       const date = new Date(dateString);
       return date.toLocaleString("en-BD", {
         timeZone: "Asia/Dhaka",
         hour12: true,
       });
     };
    




  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#F57C00]">
          Reports & Analytics
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-3 max-w-3xl mx-auto">
          The Reports & Analytics dashboard provides administrators with a
          unified view to monitor earnings, transactions, and overall financial
          performance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-700">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold text-[#F57C00]  mt-2">
            ৳ {totalEarnings}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Total revenue earned on the platform
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-700">Transactions</h3>
          <p className="text-3xl font-bold text-[#F57C00] mt-2">
            {totalPaid?.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Successful transactions recorded
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-700">
            Pending / Failed
          </h3>
          <p className="text-3xl font-bold text-[#F57C00] mt-2">
            {totalPending.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Pending or failed payments
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100">
        <div className="overflow-x-auto rounded-xl">
          <table className="table w-full">
            <thead className="bg-[#f57b00e9] text-white text-base">
              <tr>
                <th>SL.NO.</th>
                <th>User Email</th>
                <th>Payment Time</th>
                <th>Transaction ID</th>
                <th>Payment Info</th>
                <th>Currency</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              {paymentsHistory?.map((Payment, index) => (
                <tr key={index} className="hover:bg-indigo-50 transition">
                  <th className="text-slate-800 font-semibold">{index + 1}</th>
                  <td>{Payment.customerEmail}</td>
                  <td>{formatBDTime(Payment.paidAt)}</td>
                  <td className="font-mono">{Payment.transactionId}</td>
                  <td>
                    <span className="font-semibold text-[#F57C00]">
                      {Payment.totalAmount}
                    </span>
                    <span className="text-lg"> ৳ </span>
                    <span
                      className={`font-semibold ${
                        Payment.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ({Payment.paymentStatus})
                    </span>
                  </td>
                  <td className="uppercase">{Payment.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
