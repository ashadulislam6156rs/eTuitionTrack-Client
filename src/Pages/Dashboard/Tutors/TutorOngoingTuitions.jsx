import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const TutorOngoingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: ongoingTutions = [], isLoading } = useQuery({
    queryKey: ["tutor-applications-approved", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/ongoing-tuitions/approved?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-5">
      <title>My Ongoing Tuitions | eTutionTrack</title>
      <h1 className="text-3xl font-bold text-center pt-5">
        My Ongoing Tuitions
      </h1>
      <p className="text-sm text-center text-gray-400 pb-7 pt-2">
        Keep track of all your ongoing tuition sessions, monitor student
        details, subjects, and stay updated on each class status.
      </p>

      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <table className="table w-full text-gray-100">
          <thead className="bg-cyan-600 text-white text-sm">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>

          <tbody>
            {ongoingTutions.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              ongoingTutions.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="font-bold">{index + 1}</td>

                  {/* Subject */}
                  <td className="font-medium text-orange-400">
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
                  <td className="font-semibold text-green-400">
                    {item.expectedSalary}৳
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge px-3 py-1 ${
                        item.tutorRequestStatus === "Pending"
                          ? "badge-warning"
                          : item.tutorRequestStatus === "Approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.tutorRequestStatus}
                    </span>
                  </td>

                  {/* Applied Time */}
                  <td className="text-sm opacity-70">
                    {new Date(item.createdAt).toLocaleString("en-GB", {
                      timeZone: "Asia/Dhaka",
                    })}
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

export default TutorOngoingTuitions;
