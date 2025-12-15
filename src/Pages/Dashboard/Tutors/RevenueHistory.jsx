import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: applicatios = [] } = useQuery({
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
  

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-5">
        My Revenue History
      </h1>
      <p className="text-sm text-center md:w-3/4 mx-auto text-base-content/60 pb-7 pt-2">
        A complete summary of all the tuitions you have earned from. Track your
        confirmed payments, student info, subjects, and total revenue generated
        from your tutoring services.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-700">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold text-[#7627aa]  mt-2">
            ৳ {totalEarnings}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Total revenue earned on the platform
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-slate-700">Transactions</h3>
          <p className="text-3xl font-bold text-[#7627aa] mt-2">
            {PaidDatas?.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Successful transactions recorded
          </p>
        </div>
      </div>

      {/* Charts & graphs */}



      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-base-300">
        <table className="table">
          <thead className="bg-[#7627aa] text-white text-sm">
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
            {PaidDatas?.map((item, index) => (
              <tr key={index} className="hover">
                <td className="font-bold">{index + 1}</td>

                {/* Subject */}
                <td className="font-medium text-[#F57C00]">
                  {item.subjectName}
                </td>

                {/* Class */}
                <td>
                  <span className="badge badge-soft badge-primary px-3">
                    {item.className}
                  </span>
                </td>

                {/* Location */}
                <td>{item.location}</td>

                {/* Expected Salary */}
                <td className="font-semibold text-green-600">
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

                {/* Applied Time */}
                <td className="text-sm opacity-70">
                  {new Date(item?.paidAt).toLocaleString("en-GB", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>

                {/* Expected Salary */}
                <td className="font-semibold text-green-600">
                  {item.studentEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueHistory;