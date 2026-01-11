import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Componants/Loading/Loading";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";
import NoData from "../../../Componants/NoData";

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();
  const [currentTuition, setCurrentTuition] = useState({});

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tuitions-approved", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-tuitions/approved?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleTuitionDelete = (tuition) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/my-tuitions/${tuition._id}/delete`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your tuition has been deleted.",
              icon: "success",
            });

            refetch();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const handleViewDetails = (tuition) => {
    setCurrentTuition(tuition);

    modalRef.current.showModal();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <title>My Approved Tuitions | eTutionTrack</title>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">
          My Approved Tuitions
        </h1>
        <p className="text-sm text-base-content/60 dark:text-gray-400 py-2">
          View and manage your approved tuition listings.
        </p>
      </div>
      <div>
        <div className="overflow-x-auto mt-5 rounded-lg">
          <table className="table bg-white dark:bg-gray-800">
            {/* head */}
            <thead className="bg-cyan-500 dark:bg-cyan-700 text-white">
              <tr>
                <th>SL.N</th>
                <th>Subjects Info</th>
                <th>Students Info</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-300">
              {tuitions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10">
                    <NoData />
                  </td>
                </tr>
              ) : (
                tuitions.map((tuition, index) => (
                  <tr
                    key={tuition._id}
                    className="hover dark:hover:bg-gray-700/50"
                  >
                    <th className="dark:text-gray-300">{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask h-12 w-12">
                            <img
                              src={tuition.subjectImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold dark:text-gray-200">
                            {tuition.subject}
                          </div>
                          <div className="text-sm opacity-50 dark:text-gray-400">
                            {tuition?.budget} ৳
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="dark:text-gray-200">
                        {tuition.studentName}
                      </span>
                      <br />
                      <span className="badge badge-ghost dark:bg-gray-700 dark:text-gray-300 badge-sm">
                        {tuition.className}
                      </span>
                    </td>
                    <td>{tuition.location}</td>
                    <td>
                      {tuition.tuitionStatus === "Pending" ? (
                        <span className="badge badge-soft badge-primary dark:bg-blue-900 dark:text-blue-200">
                          Pending
                        </span>
                      ) : tuition.tuitionStatus === "Approved" ? (
                        <span className="badge badge-soft badge-accent dark:bg-green-900 dark:text-green-200">
                          Approved
                        </span>
                      ) : (
                        <span className="badge badge-soft badge-error dark:bg-red-900 dark:text-red-200">
                          {tuition.tuitionStatus}
                        </span>
                      )}{" "}
                    </td>
                    <th className="flex gap-3 items-center">
                      <button
                        title="View Tution Details"
                        onClick={() => handleViewDetails(tuition)}
                        className="btn bg-[#0D47A1] dark:bg-blue-700 hover:bg-transparent dark:hover:bg-blue-600 hover:text-black dark:hover:text-white text-white btn-square btn-sm"
                      >
                        <FiEye />
                      </button>
                      <Link
                        title="Update Tution Details"
                        to={`/dashboard/tuition/${tuition._id}/update`}
                        className="btn hover:bg-transparent dark:hover:bg-green-600 hover:text-black dark:hover:text-white btn-square bg-green-500 dark:bg-green-700 text-white btn-sm"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        title="Delete Tution"
                        onClick={() => handleTuitionDelete(tuition)}
                        className="btn hover:bg-transparent dark:hover:bg-red-500 hover:text-black dark:hover:text-white bg-red-400 dark:bg-red-600 text-white btn-square btn-sm"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 sm:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-950/50 max-w-lg">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary dark:border-blue-500">
              <img
                src={currentTuition?.studentImage || "/default-avatar.png"}
                alt={currentTuition?.studentName || "Student"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {currentTuition?.studentName || "No Name"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentTuition?.studentEmail}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700 dark:text-gray-300">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Class
              </p>
              <p>{currentTuition?.className || "-"}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Subject
              </p>
              <p>{currentTuition?.subject || "-"}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Schedule
              </p>
              <p>{currentTuition?.scheduleTime || "-"}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Location
              </p>
              <p>{currentTuition?.location || "-"}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Budget
              </p>
              <p>
                {currentTuition?.budget ? `${currentTuition.budget} BDT` : "-"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                Phone
              </p>
              <p>{currentTuition?.phone || "-"}</p>
            </div>
          </div>

          {/* Details */}
          {currentTuition?.details && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-4">
              <p className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Details
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {currentTuition.details}
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary dark:bg-blue-700 dark:border-blue-700 w-full">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTuitions;
