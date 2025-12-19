import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Componants/Loading/Loading';
import { FiEye } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [currentTuition, setCurrentTuition] = useState({});
  const modalRef = useRef();

    const {
      data: tuitions = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["tuitions-pending"],
      queryFn: async () => {
        const res = await axiosSecure.get("/tuitions");
        return res.data;
      },
    });


      const handleTuitions = (tuition, tuitionStatus) => {
        axiosSecure
          .patch(`/tuitions/${tuition._id}/tuitionStatus`, { tuitionStatus })
          .then((res) => {
            if (res.data.modifiedCount || res.data.matchedCount) {
              toast.success("Tuition Status Updated!");
              refetch();
            }
          })
          .catch((err) => toast.error(err.message));
      };

 const handleTuitionApproved = (tuition) => {
   Swal.fire({
     title: "Approve Tuition?",
     text: "Once approved, the student and tutor will be notified.",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, Approve it!",
   }).then((result) => {
     if (result.isConfirmed) {
       handleTuitions(tuition, "Approved");
       Swal.fire({
         title: "Approved!",
         text: "The tuition has been approved successfully.",
         icon: "success",
       });
     }
   });
 };

 const handleTuitionRejected = (tuition) => {
   Swal.fire({
     title: "Reject Tuition?",
     text: "Once rejected, the student and tutor will be notified.",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, Reject it!",
   }).then((result) => {
     if (result.isConfirmed) {
       handleTuitions(tuition, "Rejected");
       Swal.fire({
         title: "Rejected!",
         text: "The tuition has been rejected successfully.",
         icon: "error",
       });
     }
   });
 };

  
  const handleViewDetails = (tuition) => {
    setCurrentTuition(tuition);
    modalRef.current.showModal();
  };
    

    if (isLoading) {
        return <Loading></Loading>
    }
      return (
        <div>
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">Tuitions Management</h1>
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
                  <th>Subjects Info</th>
                  <th>Students Info</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map((tuition, index) => (
                  <tr key={tuition._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask  h-12 w-12">
                            <img
                              src={tuition.subjectImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{tuition.subject}</div>
                          <div className="text-sm opacity-50">
                            {tuition?.budget} ৳
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {tuition.studentName}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {tuition.className}
                      </span>
                    </td>
                    <td>{tuition.location}</td>
                    <td>
                      {tuition.tuitionStatus === "Pending" ? (
                        <span className="badge badge-soft badge-primary">
                          Pending
                        </span>
                      ) : tuition.tuitionStatus === "Approved" ? (
                        <span className="badge badge-soft badge-accent">
                          Approved
                        </span>
                      ) : (
                        <span className="badge badge-soft badge-error">
                          {tuition.tuitionStatus}
                        </span>
                      )}{" "}
                    </td>
                    <th className="flex gap-3 items-center">
                      <button
                        title="Tuition Details View"
                        onClick={() => handleViewDetails(tuition)}
                        className="btn bg-[#0D47A1] hover:bg-transparent hover:text-black text-white btn-square btn-sm"
                      >
                        <FiEye />
                      </button>
                      <button
                        title="Tuition Approved"
                        onClick={() => handleTuitionApproved(tuition)}
                        className="btn hover:bg-transparent hover:text-black btn-square bg-green-500 text-white btn-sm"
                      >
                        <IoMdCheckmarkCircleOutline />
                      </button>
                      <button
                        title="Tuition Rejected"
                        onClick={() => handleTuitionRejected(tuition)}
                        className="btn hover:bg-transparent hover:text-black bg-red-400 text-white btn-square btn-sm"
                      >
                        <RxCross2 />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box p-6 sm:p-8 rounded-xl bg-white shadow-lg max-w-lg">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={currentTuition?.studentImage || "/default-avatar.png"}
                    alt={currentTuition?.studentName || "Student"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentTuition?.studentName || "No Name"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentTuition?.studentEmail}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700">
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Class</p>
                  <p>{currentTuition?.className || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Subject</p>
                  <p>{currentTuition?.subject || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Schedule</p>
                  <p>{currentTuition?.scheduleTime || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Location</p>
                  <p>{currentTuition?.location || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Budget</p>
                  <p>
                    {currentTuition?.budget
                      ? `${currentTuition?.budget} BDT`
                      : "-"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Phone</p>
                  <p>{currentTuition?.phone || "-"}</p>
                </div>
              </div>

              {/* Details */}
              {currentTuition?.details && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <p className="font-semibold text-gray-600 mb-1">Details</p>
                  <p className="text-gray-700 text-sm">
                    {currentTuition.details}
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
      );
};

export default TuitionManagement;