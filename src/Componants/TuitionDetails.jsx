import React, { useEffect, useRef, useState } from "react";
import Container from "./Container/Container";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoArrowBack, IoSendSharp } from "react-icons/io5";
import { RiSendBackward } from "react-icons/ri";
import { MdPhone, MdLocationOn, MdClass, MdSchedule } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "./Loading/Loading";
import TutionsNotFound from "./Error/TutionsNotFound";

const TuitionDetails = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();
  const [currentTuition, setcurrentTuition] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition-details", tuitionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${tuitionId}/details`);
      return res.data;
    },
  });

  const { data: users = {}, isLoading: usersLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const {
    _id,
    budget,
    className,
    details,
    location,
    phone,
    scheduleTime,
    studentImage,
    studentName,
    subject,
    subjectImage,
    studentEmail,
  } = tuition;

  const handleTuitionRequestPopup = () => {
    setcurrentTuition(tuition);
    modalRef.current?.showModal();
  };

  useEffect(() => {
    if (currentTuition) {
      reset({
        tutorName: users?.fullName,
        tutorEmail: users?.email,
        tutorImage: users?.photoURL,
      });
    }
  }, [currentTuition, users, reset]);

  const handleTuitionRequest = (data) => {
    const requestData = {
      ...data,
      requestTuitionId: _id,
      subjectName: subject,
      studentEmail,
      location,
      className,
    };
    axiosSecure
      .post("/tuition-requests", requestData)
      .then(() => {
        toast.success("Tuition request sent successfully!");
        modalRef.current?.close();
      })
      .catch((err) => toast.error(err.message));
  };

  if (isLoading || usersLoading) {
    return <Loading></Loading>;
  }

  if (!tuition?._id) {
    return <TutionsNotFound></TutionsNotFound>;
  }

  return (
    <div className="pt-20 pb-10 dark:bg-gray-900 min-h-screen">
      <title>Tuition Details | eTuitionTrack</title>
      <Container>
        {/* Header */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn myBtn"
        >
          <IoArrowBack />
          Go Back
        </button>
        <div className="text-center pt-3 mb-5">
          <h1 className="text-3xl font-bold dark:text-gray-100">
            {subject} Tuition Details
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Review complete tuition information before sending your request.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl p-6 grid md:grid-cols-2 gap-8">
          {/* Left: Subject Image */}
          <div className="w-full h-96 ">
            <img
              src={subjectImage}
              alt={subject}
              className="rounded-xl w-full h-96 object-cover shadow-sm dark:shadow-gray-900/50"
            />
          </div>

          {/* Right: Tuition Info */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-semibold dark:text-gray-100">
              {subject}
            </h2>
            {/* Class */}
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MdClass className="text-xl" />
              <span className="font-medium">Class:</span> {className}
            </p>
            {/* Schedule */}
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MdSchedule className="text-xl" />
              <span className="font-medium">Schedule:</span> {scheduleTime}
            </p>
            {/* Location */}
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MdLocationOn className="text-xl" />
              <span className="font-medium">Location:</span> {location}
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400">
              <TbMoneybag className="text-xl" />
              {budget}
              <span className="font-bold text-xl -ml-1">৳</span>
            </p>
            {/* Phone */}
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MdPhone className="text-xl" />
              <span className="font-medium">Contact:</span> {phone}
            </p>
            {/* Details */}
            <div className="mt-3">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Tuition Description:
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                {details}
              </p>
            </div>
            {/* Student Info */}
            <div className="flex items-center gap-4 mt-4 bg-base-200 dark:bg-gray-800 p-3 rounded-lg">
              <img
                src={studentImage}
                className="w-14 h-14 rounded-full object-cover border-2 dark:border-gray-700"
                alt="Student"
              />
              <div>
                <p className="font-semibold dark:text-gray-100">
                  {studentName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {studentEmail}
                </p>
              </div>
            </div>
            {/* Request Button */}
            {users?.userRole === "Tutor" && (
              <button
                onClick={handleTuitionRequestPopup}
                className="btn myBtn-outlet w-full mt-4"
              >
                <IoSendSharp />
                Send Tuition Request
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box dark:bg-gray-800">
          <h3 className="font-bold text-lg text-center dark:text-gray-100">
            Tutor Application Form
          </h3>

          <form
            className="space-y-2"
            onSubmit={handleSubmit(handleTuitionRequest)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Your Name
                </span>
              </label>
              <input
                type="text"
                {...register("tutorName", { required: true })}
                placeholder="Your name"
                readOnly
                className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 w-full"
              />
              {errors.tutorName && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Name is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Your email
                </span>
              </label>
              <input
                type="email"
                {...register("tutorEmail", { required: true })}
                placeholder="Your email"
                readOnly
                className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 w-full"
              />
              {errors.tutorEmail && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Email is required
                </p>
              )}
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Qualifications
                </span>
              </label>
              <textarea
                {...register("qualifications", { required: true })}
                className="textarea my-1 textarea-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full h-24"
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
                className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full"
              />
              {errors.experience && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  experience is required
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  {" "}
                  Expected Salary
                </span>
              </label>
              <input
                type="number"
                {...register("expectedSalary", { required: true })}
                placeholder="e.g 5000"
                className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full"
              />
              {errors.expectedSalary && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                  Expected Salary is required
                </p>
              )}
            </div>

            <div className="mt-3">
              <button type="submit" className="myBtn btn">
                <RiSendBackward />
                Submit
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TuitionDetails;
