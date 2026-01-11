import React, { useEffect } from "react";
import Container from "../../Componants/Container/Container";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { MdVerifiedUser } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";
import Loading from "../../Componants/Loading/Loading";

const MyProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const {
    data: currentUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

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

  useEffect(() => {
    reset({
      fullName: currentUser.fullName,
      email: currentUser.email,
      contactNumber: currentUser.contactNumber,
      address: currentUser?.address || "None",
      emailVerified: user?.emailVerified,
      photoURL: user?.photoURL,
    });
  }, [
    reset,
    currentUser.fullName,
    currentUser.email,
    currentUser.contactNumber,
    currentUser?.address,
    user?.emailVerified,
    user?.photoURL,
  ]);

  const handleUpdateInfo = async (data) => {
    try {
      const userImgFile = data.photoURL?.[0];

      let finalUserImage = currentUser?.photoURL;

      if (userImgFile instanceof File) {
        finalUserImage = await uploadImageToImgBB(userImgFile);
      }

      const updateInfo = {
        displayName: data.fullName,
        photoURL: finalUserImage,
      };
      updateUserInfo(updateInfo);

      const updatedData = {
        fullName: data.fullName,
        contactNumber: data.contactNumber,
        address: data?.address,
        photoURL: finalUserImage,
      };

      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/user/${currentUser._id}/update`, updatedData);

        Swal.fire("Updated successfully!", "", "success");

        refetch();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Profile completeness calculation
  const calculateProfileCompletion = () => {
    let totalFields = 5;
    let completedFields = 0;

    if (currentUser?.fullName) completedFields++;
    if (currentUser?.email) completedFields++;
    if (currentUser?.contactNumber) completedFields++;
    if (currentUser?.address && currentUser.address !== "None")
      completedFields++;
    if (currentUser?.photoURL) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <title>My Profile | eTutionTrack</title>
      <Container>
        <div className="bg-base-100 dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-950/50 p-6 md:p-8 my-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left Profile Section */}
            <div className="flex flex-col items-center md:w-1/3 text-center">
              <div className="relative group">
                <img
                  src={
                    currentUser?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="User Avatar"
                  className="w-36 h-36 rounded-full object-cover border-4 border-[#F57C00] dark:border-orange-500 shadow-lg"
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#F57C00] dark:text-orange-400">
                {currentUser.fullName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentUser.email}
              </p>

              <div className="flex items-center justify-center mt-2 bg-linear-to-r from-[#F57C00] to-red-500 dark:from-orange-500 dark:to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {user?.emailVerified ? (
                  <>
                    <MdVerifiedUser className="mr-1" />
                    Verified User
                  </>
                ) : (
                  <>
                    <RxCrossCircled className="mr-1" />
                    Not Verified
                  </>
                )}
              </div>

              {/* Profile Completeness */}

              <div className="w-full mt-6">
                <p className="text-gray-700 dark:text-gray-300 mb-1 font-medium">
                  Profile Completeness ({profileCompletion}%)
                </p>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-4 bg-linear-to-r from-[#F57C00] to-red-500 dark:from-orange-500 dark:to-red-600 rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="md:w-2/3 md:border-l-2 md:border-l-[#f57b0042] dark:md:border-l-orange-900/30 md:pl-3 flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-[#F57C00] dark:text-orange-400 mb-4">
                Edit Profile
              </h1>

              <form
                onSubmit={handleSubmit(handleUpdateInfo)}
                className="space-y-2"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: true })}
                    className="w-full p-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F57C00] dark:focus:ring-orange-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Enter your name"
                  />
                  {errors.fullName && (
                    <p className="pt-1 text-sm md:text-base text-red-500 dark:text-red-400 font-medium">
                      Name is required
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    readOnly
                    className="w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                  />
                  {errors.email && (
                    <p className="pt-1 text-sm md:text-base text-red-500 dark:text-red-400 font-medium">
                      Email is required
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-gray-300 font-semibold">
                      Upload Image
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("photoURL")}
                    className="file-input file-input-neutral dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 p-0 mt-1 focus:ring-2 border-black dark:border-gray-600 file-input-bordered w-full"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Contact number
                  </label>
                  <input
                    type="text"
                    {...register("contactNumber")}
                    className="w-full p-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F57C00] dark:focus:ring-orange-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full p-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F57C00] dark:focus:ring-orange-500 placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Update Button */}
                <button className="myBtn btn w-full md:w-1/2 rounded-lg mt-5">
                  <BiEditAlt />
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
