import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: paymentsHistory = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-history");
      return res.data;
    },
  });

  const { data: paymentsPending = [], isLoading: pendingLoading } = useQuery({
    queryKey: ["tuition-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuition-requests");
      return res.data;
    },
  });

  const totalPaid = paymentsHistory.filter(
    (p) => p.paymentStatus?.toLowerCase() === "paid"
  );

  const totalPending = paymentsPending.filter(
    (p) => p.tutorRequestStatus === "Pending"
  );

  const totalEarnings = totalPaid.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );

  const barChartData = totalPaid.map((item) => ({
    date: new Date(item.paidAt).toLocaleDateString("en-BD"),
    amount: Number(item.totalAmount),
  }));

  const pieChartData = [
    { name: "Paid", value: totalPaid.length },
    { name: "Pending", value: totalPending.length },
  ];

  const formatBDTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      hour12: true,
    });
  };

  const COLORS = ["#22c55e", "#ef4444"];
  const BAR_COLOR = "#6366f1";

  if (paymentLoading || pendingLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <title>Reports & Analytics | eTutionTrack</title>
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#F57C00] dark:text-orange-400">
          Reports & Analytics
        </h1>
        <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-3xl mx-auto">
          Overview of earnings, transactions and payment analytics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
          <h3 className="font-semibold dark:text-gray-300">Total Earnings</h3>
          <p className="text-3xl font-bold text-[#F57C00] dark:text-orange-400 mt-2">
            ৳ {totalEarnings}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
          <h3 className="font-semibold dark:text-gray-300">Transactions</h3>
          <p className="text-3xl font-bold text-[#F57C00] dark:text-orange-400 mt-2">
            {totalPaid.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
          <h3 className="font-semibold dark:text-gray-300">Pending Payments</h3>
          <p className="text-3xl font-bold text-[#F57C00] dark:text-orange-400 mt-2">
            {totalPending.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-300">
            Earnings by Date
          </h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    border: "1px solid var(--tooltip-border, #ccc)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="amount" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PieChart */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">
            Payment Status Distribution
          </h3>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    border: "1px solid var(--tooltip-border, #ccc)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow dark:shadow-gray-950/50 border dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#F57C00] dark:bg-orange-700 text-white">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Paid At</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="dark:text-gray-300">
              {paymentsHistory.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10">
                    <NoData />
                  </td>
                </tr>
              ) : (
                paymentsHistory.map((p, index) => (
                  <tr key={index} className="hover dark:hover:bg-gray-700/50">
                    <td>{index + 1}</td>
                    <td>{p.customerEmail}</td>
                    <td>{formatBDTime(p.paidAt)}</td>
                    <td className="font-mono">{p.transactionId}</td>
                    <td>৳ {p.totalAmount}</td>
                    <td
                      className={
                        p.paymentStatus?.toLowerCase() === "paid"
                          ? "text-green-600 dark:text-green-400 font-semibold"
                          : "text-red-600 dark:text-red-400 font-semibold"
                      }
                    >
                      {p.paymentStatus}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add dark mode CSS variables for chart tooltips */}
      <style>{`
          html[data-theme="dark"] {
            --tooltip-bg: #1f2937;
            --tooltip-border: #374151;
          }
          html[data-theme="light"] {
            --tooltip-bg: #fff;
            --tooltip-border: #ccc;
          }
        `}</style>
    </div>
  );
};

export default ReportsAnalytics;
