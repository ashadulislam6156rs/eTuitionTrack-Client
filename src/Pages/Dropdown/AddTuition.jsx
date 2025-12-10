import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlinePostAdd } from "react-icons/md";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const AddTuition = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      budget: "",
      className: "",
      subject: "",
      scheduleTime: "",
      location: "",
      details: "",
      subjectImage: null,
    },
  });

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Watch selected class
  const selectedClass = watch("className") || "";

  const [filteredSubjects, setFilteredSubjects] = useState([]);

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

  useEffect(() => {
    if (selectedClass && subjectsByClass[selectedClass]) {
      setFilteredSubjects(subjectsByClass[selectedClass]);
      setValue("subject", "");
    } else {
      setFilteredSubjects([]);
      setValue("subject", "");
    }
  }, [selectedClass, setValue]);

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

  const handleAddTuition = async (data) => {
    

    const photoFile = data.subjectImage?.[0];
    if (!photoFile) return toast.error("Please upload a subject image");

    const formData = new FormData();
    formData.append("image", photoFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_api_Key
      }`,
      formData
    );

    const studentName = user?.displayName;
    const studentEmail = user?.email;
    const studentImage = user?.photoURL;

    const subjectImageURL = res.data.data.url;

    const tuitionData = {
      ...data,
      subjectImage: subjectImageURL,
      studentName: studentName,
      studentEmail: studentEmail,
      studentImage: studentImage,
    };

    axiosSecure
      .post("/tuitions", tuitionData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success(res.data.message || "Tuition added successfully");
        }
      })
      .catch((err) => toast.error(err.message));

    
  };

  return (
    <div className="flex items-center justify-center p-6 font-sans">
      <div className="card bg-base-100 shadow-2xl max-w-6xl w-full rounded-2xl overflow-hidden">
        <div className="card-body w-full p-8 sm:p-10">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Add Tuition
          </h1>
          <p className="text-base-content/70 mb-6">
            Provide details to create a professional tuition listing.
          </p>

          <form
            onSubmit={handleSubmit(handleAddTuition)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Left Column */}
            <div className="flex flex-col gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="+880123456789"
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Subject Image
                  </span>
                </label>
                <input
                  type="file"
                  {...register("subjectImage", { required: true })}
                  className="file-input my-1 file-input-bordered w-full"
                />
                {errors.subjectImage && (
                  <p className="text-xs text-red-500 font-medium">
                    Subject Image is required
                  </p>
                )}
              </div>

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
            </div>

            {/* Right Column */}
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
                  <span className="label-text font-semibold">Location</span>
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

              <div className="form-control">
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
              
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="btn myBtn w-full flex items-center justify-center gap-2"
              >
                <MdOutlinePostAdd className="text-base font-bold" />
                Post Tuition
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTuition;
