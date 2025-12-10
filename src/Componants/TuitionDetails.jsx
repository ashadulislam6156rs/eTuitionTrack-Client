import React, { useRef, useState } from "react";
import Container from "./Container/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoSendSharp } from "react-icons/io5";
import {
  MdPhone,
  MdLocationOn,
  MdClass,
  MdSchedule,
} from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";

const TuitionDetails = () => {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();
  const [tuttionRequest, setTuttionRequest] = useState()

  const { data: tuition = {} } = useQuery({
    queryKey: ["tuition-details", tuitionId],
    queryFn: async () => {
      const res = await axiosSecure(`/tuitions/${tuitionId}/details`);
      return res.data;
    },
  });


  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const {
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

  const handleTuitionRequest = () => {
    setTuttionRequest(tuition)
    modalRef.current.showModal();
    
  }
  console.log(tuttionRequest);
  

  return (
    <div className="pt-20 pb-10">
      <Container>
        {/* Header */}
        <div className="text-center pt-3 mb-5">
          <h1 className="text-3xl font-bold">{subject} Tuition Details</h1>
          <p className="text-base text-gray-500 mt-2">
            Review complete tuition information before sending your request.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl p-6 grid md:grid-cols-2 gap-8">
          {/* Left: Subject Image */}
          <div className="w-full h-96">
            <img
              src={subjectImage}
              alt={subject}
              className="rounded-xl w-full h-96 object-cover shadow-sm"
            />
          </div>

          {/* Right: Tuition Info */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-semibold">{subject}</h2>
            {/* Class */}
            <p className="flex items-center gap-2 text-gray-700">
              <MdClass className="text-xl" />
              <span className="font-medium">Class:</span> {className}
            </p>
            {/* Schedule */}
            <p className="flex items-center gap-2 text-gray-700">
              <MdSchedule className="text-xl" />
              <span className="font-medium">Schedule:</span> {scheduleTime}
            </p>
            {/* Location */}
            <p className="flex items-center gap-2 text-gray-700">
              <MdLocationOn className="text-xl" />
              <span className="font-medium">Location:</span> {location}
            </p>
            `
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <TbMoneybag className="text-xl" />
              {budget}
              <span className="font-bold text-xl -ml-1">৳</span>
            </p>
            {/* Phone */}
            <p className="flex items-center gap-2 text-gray-700">
              <MdPhone className="text-xl" />
              <span className="font-medium">Contact:</span> {phone}
            </p>
            {/* Details */}
            <div className="mt-3">
              <p className="font-medium text-gray-700">Tuition Description:</p>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {details}
              </p>
            </div>
            {/* Student Info */}
            <div className="flex items-center gap-4 mt-4 bg-base-200 p-3 rounded-lg">
              <img
                src={studentImage}
                className="w-14 h-14 rounded-full object-cover"
                alt="Student"
              />
              <div>
                <p className="font-semibold">{studentName}</p>
                <p className="text-sm text-gray-500">{studentEmail}</p>
              </div>
            </div>
            {/* Request Button */}
            {users?.userRole === "Tutor" && (
              <button
                onClick={handleTuitionRequest}
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
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">{tuttionRequest?.studentEmail}</p>

          <form>
            
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

export default TuitionDetails;
