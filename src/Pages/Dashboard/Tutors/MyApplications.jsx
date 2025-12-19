import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine, RiSendBackward } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();

  const [currentTutor, setcurrentTutor] = useState({});

  const { data: applicatios = [], refetch } = useQuery({
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
    const updateInfo = {
      ...data,
    };

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-5">My Applications</h1>
      <p className="text-sm text-center text-base-content/60 pb-7 pt-2">
        Track all the tuitions you have applied for, including status, subject,
        and student details.
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-base-300">
        <table className="table">
          <thead className="bg-cyan-500 text-white text-sm">
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
            {applicatios?.map((item, index) => (
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

                {/* View Button */}
                <td className="space-x-2">
                  <button
                    title="Edit Application"
                    onClick={() => handleModalShow(item)}
                    disabled={item.tutorRequestStatus === "Approved"}
                    className={`btn btn-square btn-sm bg-green-500 text-white 
      hover:bg-transparent hover:text-black
      ${
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
                    className={`btn btn-square btn-sm bg-red-400 text-white 
      hover:bg-transparent hover:text-black
      ${
        item.tutorRequestStatus === "Approved"
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Tutor Application Update Form
          </h3>

          <form className="space-y-2" onSubmit={handleSubmit(handleUpdateInfo)}>
            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Qualifications</span>
              </label>
              <textarea
                {...register("qualifications", { required: true })}
                className="textarea my-1 textarea-bordered w-full h-24"
                placeholder="e.g. B.Sc. in CSE...English/Bangla Medium"
              ></textarea>
              {errors.qualifications && (
                <p className="text-xs text-red-500 font-medium">
                  Qualifications is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Experience</span>
              </label>
              <input
                type="text"
                {...register("experience", { required: true })}
                placeholder="e.g. 1 year in Subject....."
                className="input my-1 input-bordered w-full"
              />
              {errors.experience && (
                <p className="text-xs text-red-500 font-medium">
                  experience is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  {" "}
                  Expected Salary
                </span>
              </label>
              <input
                type="number"
                {...register("expectedSalary", { required: true })}
                placeholder="e.g 5000"
                className="input my-1 input-bordered w-full"
              />
              {errors.expectedSalary && (
                <p className="text-xs text-red-500 font-medium">
                  Expected Salary is required
                </p>
              )}
            </div>

            <div className="mt-3">
              <button type="submit" className="myBtn btn">
                {/* <RiSendBackward /> */}
                Submit
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
