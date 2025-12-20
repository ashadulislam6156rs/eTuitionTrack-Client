import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";

import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();
  const [currentTutor, setCurrentTutor] = useState({});

  const {
    data: Tutors = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tuition-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuition-requests?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleViewDetails = (tutor) => {
    setCurrentTutor(tutor);
    modalRef.current.showModal();
  };

  const formatBDTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      hour12: true,
    });
  };

  const handleTutorRejected = (tutor, tutorRequestStatus) => {
    Swal.fire({
      title: "Reject this tutor request?",
      text: "Once rejected, this action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tuition-requests/${tutor._id}`, { tutorRequestStatus })
          .then(() => {
            Swal.fire({
              title: "Request Rejected",
              text: "The tutor request has been successfully rejected.",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const handlePayment = (tutor) => {
    const paymentInfo = {
      expectedSalary: tutor.expectedSalary,
      studentEmail: tutor.studentEmail,
      tuitionId: tutor._id,
      subjectName: tutor?.subjectName || "Tuition Payment",
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-teal-600 text-white btn-success",
        cancelButton: "btn mr-2 text-white bg-red-500 btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure pay it ${tutor.expectedSalary}৳ ?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Pay it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo
          );

          window.location.href = res.data.url;
          swalWithBootstrapButtons.fire({
            title: "Processing!",
            text: "Your Payment has been Ready.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary Money is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">Applied Tutors</h1>
        <p className="text-sm text-base-content/60 py-2">
          Review all tuition requests that are waiting for approval. Manage
          details and take necessary actions from here.
        </p>
      </div>
      <div className="overflow-x-auto mt-5 rounded-lg">
        <table className="table bg-white">
          {/* head */}
          <thead className="bg-cyan-500 text-white">
            <tr>
              <th>SL.N</th>
              <th>Tutors Info</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Accepted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="rounded-lg">
            {Tutors.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              Tutors.map((tutor, index) => (
                <tr key={tutor._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded-full  h-12 w-12">
                          <img src={tutor.tutorImage} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{tutor.tutorName}</div>
                        <div className="text-sm opacity-50">
                          {tutor.tutorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{tutor.experience}</td>
                  <td>{tutor.expectedSalary} ৳</td>
                  <td>
                    {tutor.tutorRequestStatus === "Pending" ? (
                      <span className="badge badge-soft badge-primary">
                        Pending
                      </span>
                    ) : tutor.tutorRequestStatus === "Approved" ? (
                      <span className="badge badge-soft badge-accent">
                        Approved
                      </span>
                    ) : (
                      <span className="badge badge-soft badge-error">
                        {tutor.tutorRequestStatus}
                      </span>
                    )}{" "}
                  </td>
                  <td>
                    {tutor.tutorRequestStatus === "Pending" ? (
                      <button
                        onClick={() => handlePayment(tutor)}
                        className="btn btn-sm bg-[#0D47A1] hover:bg-transparent hover:text-black text-white"
                      >
                        Accept Tutor
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn opacity-60 btn-sm bg-[#0D47A1] hover:bg-transparent cursor-not-allowed text-white"
                      >
                        Accepted
                      </button>
                    )}
                  </td>

                  <th className="flex gap-3 items-center">
                    <button
                      title="View Tutor Details"
                      onClick={() => handleViewDetails(tutor)}
                      className="btn bg-[#0D47A1] hover:bg-transparent hover:text-black text-white btn-square btn-sm"
                    >
                      <FiEye />
                    </button>
                    <button
                      title="Reject Tutor"
                      onClick={() => handleTutorRejected(tutor, "Rejected")}
                      className="btn hover:bg-transparent hover:text-black bg-red-400 text-white btn-square btn-sm"
                    >
                      <RxCross2 />
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 sm:p-8 rounded-xl bg-white shadow-lg max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={currentTutor?.tutorImage || "/default-avatar.png"}
                alt={currentTutor?.tutorImage || "Student"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentTutor?.tutorName || "No Name"}
              </h3>
              <p className="text-sm text-gray-500">
                {currentTutor?.tutorEmail}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700">
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600">Experiment</p>
              <p>{currentTutor?.experience || "-"}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600">Qualifications</p>
              <p>{currentTutor?.qualifications || "-"}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600">Status</p>
              <p>{currentTutor?.tutorRequestStatus || "-"}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600">Rquest Time</p>
              <p>{formatBDTime(currentTutor?.createdAt || "-")}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600">Expected Salary</p>
              <p>
                {currentTutor?.expectedSalary
                  ? `${currentTutor.expectedSalary} BDT`
                  : "-"}
              </p>
            </div>
          </div>

          {currentTutor?.details && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <p className="font-semibold text-gray-600 mb-1">Details</p>
              <p className="text-gray-700 text-sm">{currentTutor.details}</p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary w-full">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedTutors;
