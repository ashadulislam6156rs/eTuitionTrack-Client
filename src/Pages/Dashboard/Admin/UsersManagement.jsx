import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaUserShield } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { FaChalkboardUser } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../../Componants/Loading/Loading";
import NoData from "../../../Componants/NoData";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const userDetailsModalRef = useRef();
  const userInfoUpdateModalRef = useRef();
  const [currentUser, setCurrentUser] = useState({});

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      const filterUser = res.data.filter((user) => user.userRole !== "Admin");
      return filterUser;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUserDelete = (user) => {
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
          .delete(`/user/${user._id}/delete`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
            });

            refetch();
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const handleUsersViewDetails = (user) => {
    setCurrentUser(user);
    userDetailsModalRef.current.showModal();
  };

  const userInfoUpdate = (user) => {
    setCurrentUser(user);
    userInfoUpdateModalRef.current.showModal();
  };

  useEffect(() => {
    if (currentUser) {
      reset({
        fullName: currentUser.fullName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        contactNumber: currentUser?.contactNumber,
        userRole: currentUser.userRole,
      });
    }
  }, [currentUser, reset]);

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

  // user role convert lowercase to Capitalized
  const capitalize = (text) =>
    text ? text[0].toUpperCase() + text.slice(1).toLowerCase() : "";

  const handleUpdateInfo = async (data) => {
    try {
      const userImgFile = data.photoURL?.[0];

      let finalUserImage = currentUser.photoURL;

      if (userImgFile instanceof File) {
        finalUserImage = await uploadImageToImgBB(userImgFile);
      }

      const updatedData = {
        fullName: data.fullName,
        contactNumber: data.contactNumber,
        userRole: capitalize(data.userRole),
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
        //  userInfoUpdateModalRef.current.close();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUserRoleUpdate = async (user, role) => {
    try {
      await axiosSecure.patch(`/user/role/${user._id}/update`, {
        userRole: role,
      });
      toast.success(`Your User role has been Changed. ${role}`);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateUserRole = (user, role) => {
    Swal.fire({
      title: `Are you sure to change User Role ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUserRoleUpdate(user, role);
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <title>Users Management | eTutionTrack</title>
      <div>
        <h1 className="text-3xl font-bold text-center pt-5 dark:text-gray-100">
          Users Management
        </h1>
        <p className="text-sm text-center md:w-3/4 mx-auto text-base-content/60 dark:text-gray-400 pb-7 pt-2">
          This dashboard allows you to efficiently manage all registered users.
          You can view their profiles, update roles such as Admin, Tutor, or
          Student, monitor contact information, and track registration details
          to keep the user database organized and up-to-date.
        </p>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-950/50 border border-base-300 dark:border-gray-700">
          <table className="table">
            <thead className="bg-cyan-500 dark:bg-cyan-700 text-white text-sm">
              <tr>
                <th>#</th>
                <th>User Info</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Register On</th>
                <th>Update Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="dark:text-gray-300">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10">
                    <NoData />
                  </td>
                </tr>
              ) : (
                users?.map((user, index) => (
                  <tr key={index} className="hover dark:hover:bg-gray-700/50">
                    <td className="font-bold">{index + 1}</td>

                    {/* User info */}
                    <td>
                      <div className="flex users-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold dark:text-gray-200">
                            {user.fullName}
                          </div>
                          <div className="text-sm opacity-50 dark:text-gray-400">
                            {user.contactNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* user email */}
                    <td>
                      <span className="badge badge-soft badge-primary dark:bg-blue-900 dark:text-blue-200 px-3">
                        {user.email}
                      </span>
                    </td>

                    {/*User role */}
                    <td>
                      <span
                        className={`badge px-3 py-1 ${
                          user.userRole === "Tutor"
                            ? "badge-secondary dark:bg-purple-900 dark:text-purple-200"
                            : user.userRole === "Admin"
                            ? "badge-primary dark:bg-blue-900 dark:text-blue-200"
                            : "badge-neutral dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {user.userRole}
                      </span>
                    </td>

                    {/* Register Time */}
                    <td className="text-sm opacity-70 dark:text-gray-400">
                      {new Date(user?.createdAt).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                      })}
                    </td>

                    {/* Update Role */}

                    <td className="space-x-2">
                      <button
                        title="Update User Role Admin"
                        onClick={() => updateUserRole(user, "Admin")}
                        disabled={user.userRole === "Admin"}
                        className={`btn bg-[#0D47A1] dark:bg-blue-700 hover:bg-transparent dark:hover:bg-blue-600 hover:text-black dark:hover:text-white text-white btn-square btn-sm ${
                          user.userRole === "Admin"
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FaUserShield />
                      </button>
                      <button
                        title="Update User Role Student"
                        onClick={() => updateUserRole(user, "Student")}
                        disabled={user.userRole === "Student"}
                        className={`btn hover:bg-transparent dark:hover:bg-red-500 hover:text-black dark:hover:text-white bg-red-400 dark:bg-red-600 text-white btn-square btn-sm ${
                          user.userRole === "Student"
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <GrUserManager />
                      </button>

                      <button
                        title="Update User Role Tutor"
                        onClick={() => updateUserRole(user, "Tutor")}
                        disabled={user.userRole === "Tutor"}
                        className={`btn hover:bg-transparent dark:hover:bg-green-600 hover:text-black dark:hover:text-white btn-square bg-green-500 dark:bg-green-700 text-white btn-sm ${
                          user.userRole === "Tutor"
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FaChalkboardUser />
                      </button>
                    </td>

                    {/* View Button */}
                    <td className="space-x-2">
                      <button
                        title="User Details View"
                        onClick={() => handleUsersViewDetails(user)}
                        className="btn bg-[#0D47A1] dark:bg-blue-700 hover:bg-transparent dark:hover:bg-blue-600 hover:text-black dark:hover:text-white text-white btn-square btn-sm"
                      >
                        <FiEye />
                      </button>
                      <button
                        title="Update User Info"
                        onClick={() => userInfoUpdate(user)}
                        className="btn hover:bg-transparent dark:hover:bg-green-600 hover:text-black dark:hover:text-white btn-square bg-green-500 dark:bg-green-700 text-white btn-sm"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        title="User Delete"
                        onClick={() => handleUserDelete(user)}
                        className="btn hover:bg-transparent dark:hover:bg-red-500 hover:text-black dark:hover:text-white bg-red-400 dark:bg-red-600 text-white btn-square btn-sm"
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
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog
          ref={userInfoUpdateModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box dark:bg-gray-800">
            <h3 className="font-bold text-lg text-center dark:text-gray-100">
              User Info Update Form
            </h3>

            <form
              className="space-y-2"
              onSubmit={handleSubmit(handleUpdateInfo)}
            >
              <div className="form-control w-full md:col-span-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-gray-300 font-semibold">
                      Full name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName", { required: true })}
                    placeholder="Enter name"
                    className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                      Name is required
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-gray-300 font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter email"
                    readOnly
                    className="input my-1 input-bordered dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 w-full"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                      Email is required
                    </p>
                  )}
                </div>

                <label className="label dark:text-gray-300 -mb-3.5">
                  User Image
                </label>
                <input
                  type="file"
                  {...register("photoURL")}
                  className="file-input w-full file-input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300 font-semibold">
                    Contact number
                  </span>
                </label>
                <input
                  type="text"
                  {...register("contactNumber", { required: true })}
                  placeholder="Enter contact number"
                  className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full"
                />
                {errors.contactNumber && (
                  <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                    Contact Number is required
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300 font-semibold">
                    User Role
                  </span>
                </label>
                <input
                  type="text"
                  {...register("userRole", { required: true })}
                  placeholder="Enter user role"
                  className="input my-1 input-bordered dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 w-full"
                />
                {errors.userRole && (
                  <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                    Role is required
                  </p>
                )}
              </div>

              <div className="mt-3">
                <button type="submit" className="myBtn btn">
                  Submit
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* User details View */}
        <dialog
          ref={userDetailsModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box p-6 sm:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-950/50 max-w-lg">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary dark:border-blue-500">
                <img
                  src={currentUser?.photoURL || "/default-avatar.png"}
                  alt={currentUser?.photoURL || "Student"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {currentUser?.fullName || "No Name"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600 dark:text-gray-400">
                  Contact Number
                </p>
                <p>{currentUser?.contactNumber || "-"}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600 dark:text-gray-400">
                  Role
                </p>
                <p>{currentUser?.userRole || "-"}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600 dark:text-gray-400">
                  Register Time
                </p>
                <p>
                  {new Date(currentUser?.createdAt).toLocaleString("en-GB", {
                    timeZone: "Asia/Dhaka",
                  }) || "-"}{" "}
                </p>
              </div>
            </div>

            {/* Details */}
            {currentUser?.details && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-4">
                <p className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Details
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {currentUser.details}
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
    </div>
  );
};

export default UsersManagement;
