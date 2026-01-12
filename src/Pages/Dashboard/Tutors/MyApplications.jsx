import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();

  const [currentTutor, setcurrentTutor] = useState({});

  const {
    data: applicatios = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor-applications?email=${user?.email}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (currentTutor) {
      reset({
        expectedSalary: currentTutor.expectedSalary,
        experience: currentTutor.experience,
        qualifications: currentTutor.qualifications,
      });
    }
  }, [currentTutor, reset]);

  const handleModalShow = (tutor) => {
    setcurrentTutor(tutor);
    modalRef.current.showModal();
  };

  const handleUpdateInfo = (data) => {
    const updateInfo = { ...data };
    modalRef.current?.close();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tutor-applications/${currentTutor._id}/update`, updateInfo)
          .then(() => {
            Swal.fire("Saved!", "", "success");
            refetch();
          })
          .catch((err) => toast.error(err.message));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleTutorDelete = (tutor) => {
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
          .delete(`/tutor-applications/${tutor._id}/delete`)
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
      <title>My Applications | eTutionTrack</title>
      <h1 className="text-3xl font-bold text-center pt-5">My Applications</h1>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 pb-7 pt-2">
        Track all the tuitions you have applied for, including status, subject,
        and student details.
      </p>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="table w-full text-gray-900 dark:text-gray-100">
          <thead className="bg-cyan-500 dark:bg-cyan-600 text-white text-sm">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applicatios.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-10">
                  <NoData />
                </td>
              </tr>
            ) : (
              applicatios.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="font-bold">{index + 1}</td>
                  <td className="font-medium text-orange-600 dark:text-orange-400">
                    {item.subjectName}
                  </td>
                  <td>
                    <span className="badge badge-soft badge-primary px-3">
                      {item.className}
                    </span>
                  </td>
                  <td>{item.location}</td>
                  <td className="font-semibold text-green-600 dark:text-green-400">
                    {item.expectedSalary}৳
                  </td>
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
                  <td className="text-sm opacity-70">
                    {new Date(item.createdAt).toLocaleString("en-GB", {
                      timeZone: "Asia/Dhaka",
                    })}
                  </td>
                  <td className="space-x-2">
                    <button
                      title="Edit Application"
                      onClick={() => handleModalShow(item)}
                      disabled={item.tutorRequestStatus === "Approved"}
                      className={`btn btn-square btn-sm bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 ${
                        item.tutorRequestStatus === "Approved"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FaRegEdit />
                    </button>

                    <button
                      title="Delete Application"
                      onClick={() => handleTutorDelete(item)}
                      disabled={item.tutorRequestStatus === "Approved"}
                      className={`btn btn-square btn-sm bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 ${
                        item.tutorRequestStatus === "Approved"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h3 className="font-bold text-lg text-center">
            Tutor Application Update Form
          </h3>

          <form className="space-y-2" onSubmit={handleSubmit(handleUpdateInfo)}>
            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Qualifications
                </span>
              </label>
              <textarea
                {...register("qualifications", { required: true })}
                className="textarea my-1 textarea-bordered w-full h-24 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="e.g. B.Sc. in CSE...English/Bangla Medium"
              ></textarea>
              {errors.qualifications && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Qualifications is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Experience
                </span>
              </label>
              <input
                type="text"
                {...register("experience", { required: true })}
                placeholder="e.g. 1 year in Subject....."
                className="input my-1 input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              {errors.experience && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Experience is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Expected Salary
                </span>
              </label>
              <input
                type="number"
                {...register("expectedSalary", { required: true })}
                placeholder="e.g 5000"
                className="input my-1 input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              {errors.expectedSalary && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Expected Salary is required
                </p>
              )}
            </div>

            <div className="mt-3">
              <button
                type="submit"
                className="myBtn btn bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
