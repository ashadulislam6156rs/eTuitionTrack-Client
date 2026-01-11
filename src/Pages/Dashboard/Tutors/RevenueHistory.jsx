import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: applicatios = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor-applications?email=${user?.email}`
      );
      return res.data;
    },
  });

  const PaidDatas = applicatios.filter(
    (application) => application.paymentStatus === "Paid"
  );

  const totalEarnings = PaidDatas.reduce(
    (sum, item) => sum + Number(item.expectedSalary),
    0
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-5">
      <title>My Revenue History | eTutionTrack</title>
      <h1 className="text-3xl font-bold text-center pt-5">
        My Revenue History
      </h1>
      <p className="text-sm text-center text-gray-400 md:w-3/4 mx-auto pb-7 pt-2">
        A complete summary of all the tuitions you have earned from. Track your
        confirmed payments, student info, subjects, and total revenue generated
        from your tutoring services.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-100">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold text-cyan-400 mt-2">
            ৳ {totalEarnings}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Total revenue earned on the platform
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-100">Transactions</h3>
          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {PaidDatas?.length}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Successful transactions recorded
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <table className="table w-full text-gray-100">
          <thead className="bg-cyan-600 text-white text-sm">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Paid On</th>
              <th>Student Info</th>
            </tr>
          </thead>

          <tbody>
            {PaidDatas.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              PaidDatas?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="font-bold">{index + 1}</td>

                  {/* Subject */}
                  <td className="font-medium text-orange-400">
                    {item.subjectName}
                  </td>

                  {/* Class */}
                  <td>
                    <span className="badge text-xs md:text-sm md:badge-soft md:badge-primary px-3">
                      {item.className}
                    </span>
                  </td>

                  {/* Location */}
                  <td>{item.location}</td>

                  {/* Salary */}
                  <td className="font-semibold text-green-400">
                    {item.expectedSalary}৳
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge px-3 py-1 ${
                        item.paymentStatus === "Paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Paid Time */}
                  <td className="text-sm opacity-70">
                    {new Date(item?.paidAt).toLocaleString("en-GB", {
                      timeZone: "Asia/Dhaka",
                    })}
                  </td>

                  {/* Student Info */}
                  <td className="font-semibold text-green-400">
                    {item.studentEmail}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueHistory;
