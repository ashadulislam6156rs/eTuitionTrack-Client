import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const EditTuition = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const selectedClass = watch("className") || "";
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Subjects by class
  const subjectsByClass = {
    "Class 1": [
      "Bangla",
      "English",
      "Mathematics",
      "Science",
      "Religion (Islam)",
    ],
    "Class 2": [
      "Bangla",
      "English",
      "Mathematics",
      "Science",
      "Religion (Islam)",
    ],
    "Class 3": [
      "Bangla",
      "English",
      "Mathematics",
      "Science",
      "Religion (Islam)",
    ],
    "Class 4": [
      "Bangla",
      "English",
      "Mathematics",
      "Science",
      "Religion (Islam)",
    ],
    "Class 5": [
      "Bangla",
      "English",
      "Mathematics",
      "Science",
      "Religion (Islam)",
    ],
    "Class 6": [
      "General Math",
      "Higher Math (optional)",
      "General Science",
      "ICT",
    ],
    "Class 7": [
      "General Math",
      "Higher Math (optional)",
      "General Science",
      "ICT",
    ],
    "Class 8": [
      "General Math",
      "Higher Math (optional)",
      "General Science",
      "ICT",
    ],
    "Class 9": [
      "Bangla 1st Paper",
      "Bangla 2nd Paper",
      "English 1st Paper",
      "Physics",
      "Chemistry",
      "Biology",
    ],
    "Class 10": [
      "Bangla 1st Paper",
      "Bangla 2nd Paper",
      "English 1st Paper",
      "Physics",
      "Chemistry",
      "Biology",
    ],
    "HSC First Year": [
      "Bangla",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Higher Math",
      "ICT",
    ],
    "HSC Second Year": [
      "Bangla",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Higher Math",
      "ICT",
    ],
  };

  const classes = Object.keys(subjectsByClass);

  const scheduleTimes = [
    "Morning 8 AM - 10 AM",
    "Morning 10 AM - 12 PM",
    "Afternoon 2 PM - 4 PM",
    "Evening 4 PM - 6 PM",
    "Evening 6 PM - 8 PM",
    "Night 8 PM - 9 PM",
  ];

  const locations = [
    "City Corporation Area",
    "Ganginar Par",
    "Charpara",
    "Kachari Road",
    "Maskanda",
    "Sheshmore",
    "KR Market",
    "Notun Bazar",
    "Town Hall Area",
    "Sarda Ghosh Road",
    "Shambhuganj",
    "Baura",
    "Bidyaganj",
    "C K Gosh Road",
    "Police Line Area",
    "Boro Bazar",
    "Kewatkhali",
    "Sankipara",
  ];

  
  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["edit-tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tuitions/${id}/update`);
      return res.data;
    },
  });

 
  useEffect(() => {
    if (!tuition.className) return;

    const subjects = subjectsByClass[tuition.className] || [];
    setFilteredSubjects(subjects);

   
    setTimeout(() => {
      if (subjects.includes(tuition.subject)) {
        setValue("subject", tuition.subject);
      }
    }, 50);
  }, [tuition.className]);


  useEffect(() => {
    if (!selectedClass) return;
    const subjects = subjectsByClass[selectedClass] || [];
    setFilteredSubjects(subjects);

    
    setValue("subject", "");
  }, [selectedClass]);

  
  useEffect(() => {
    if (tuition) {
      reset({
        phone: tuition.phone,
        budget: tuition.budget,
        className: tuition.className,
        scheduleTime: tuition.scheduleTime,
        location: tuition.location,
        details: tuition.details,
        subject: tuition.subject,
        studentName: tuition.studentName,
        studentEmail: tuition.studentEmail,
      });
    }
  }, [tuition, reset]);

 
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_api_Key
      }`,
      formData
    );

    return res.data.data.url;
  };

  const handleEditTuition = async (data) => {
    try {
      const subjectImgFile = data.subjectImage?.[0];
      const studentImgFile = data.studentImage?.[0];

      const finalSubjectImage = subjectImgFile
        ? await uploadImageToImgBB(subjectImgFile)
        : tuition.subjectImage;
      const finalStudentImage = studentImgFile
        ? await uploadImageToImgBB(studentImgFile)
        : tuition.studentImage;

      const updatedData = {
        ...data,
        subjectImage: finalSubjectImage,
        studentImage: finalStudentImage,
      };

    
const result = await Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`,
});

if (result.isConfirmed) {
  await axiosSecure.patch(`/my-tuitions/${id}/update`, updatedData);
  Swal.fire("Updated successfully!", "", "success");
} else if (result.isDenied) {
  Swal.fire("Changes are not saved", "", "info");
}


    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-2xl max-w-6xl w-full rounded-2xl overflow-hidden">
        <div className="card-body p-8 sm:p-10">
          <h1 className="text-4xl text-center font-bold mb-2">
            Update Tuition
          </h1>

          <form
            onSubmit={handleSubmit(handleEditTuition)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* LEFT */}
            <div className="flex flex-col gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="phone"
                  className="input my-1 input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 font-medium">
                    Phone number is required
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Budget</span>
                </label>
                <input
                  type="number"
                  {...register("budget", { required: true })}
                  placeholder="5000"
                  className="input my-1 input-bordered w-full"
                />
                {errors.budget && (
                  <p className="text-xs text-red-500 font-medium">
                    Budget is required
                  </p>
                )}
              </div>

              <label className="label -mb-3.5">Subject Image</label>
              <input
                type="file"
                {...register("subjectImage")}
                className="file-input w-full file-input-bordered"
              />

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Class</span>
                </label>
                <select
                  {...register("className", { required: true })}
                  className="select my-1 select-bordered w-full"
                  value={selectedClass}
                  onChange={(e) => setValue("className", e.target.value)}
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {errors.className && (
                  <p className="text-xs text-red-500 font-medium">
                    Class is required
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your email</span>
                </label>
                <input
                  type="email"
                  {...register("studentEmail", { required: true })}
                  placeholder="studentEmail"
                  readOnly
                  className="input my-1 input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 font-medium">
                    Email is required
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <select
                  {...register("subject", { required: true })}
                  className="select my-1 select-bordered w-full"
                  value={watch("subject") || ""}
                  onChange={(e) => setValue("subject", e.target.value)}
                >
                  <option value="">Select a subject</option>
                  {filteredSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-xs text-red-500 font-medium">
                    Subject is required
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Schedule</span>
                </label>
                <select
                  {...register("scheduleTime", { required: true })}
                  className="select my-1 select-bordered w-full"
                >
                  <option value="">Select a schedule</option>
                  {scheduleTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.scheduleTime && (
                  <p className="text-xs text-red-500 font-medium">
                    Schedule is required
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                   Location
                  </span>
                </label>
                <select
                  {...register("location", { required: true })}
                  className="select my-1 select-bordered w-full"
                >
                  <option value="">Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-xs text-red-500 font-medium">
                    Location is required
                  </p>
                )}
              </div>

              <label className="label -mb-3.5">Your Image</label>
              <input
                type="file"
                {...register("studentImage")}
                className="file-input w-full file-input-bordered"
              />

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  {...register("studentName", { required: true })}
                  placeholder="studentName"
                  className="input my-1 input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 font-medium">
                    Name is required
                  </p>
                )}
              </div>
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Details</span>
              </label>
              <textarea
                {...register("details", { required: true })}
                className="textarea my-1 textarea-bordered w-full h-24"
                placeholder="Enter details (optional)"
              />
              {errors.details && (
                <p className="text-xs text-red-500 font-medium">
                  Details is required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full md:col-span-2"
            >
              <MdEdit /> Update Tuition
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTuition;
