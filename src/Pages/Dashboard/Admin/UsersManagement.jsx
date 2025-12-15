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

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const userDetailsModalRef = useRef();
    const userInfoUpdateModalRef = useRef();
    const [currentUser, setCurrentUser] = useState({});

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users-management"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    })

    const {register, handleSubmit, formState:{errors}, reset} = useForm();

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
        setCurrentUser(user)
        userDetailsModalRef.current.showModal();
    }
    

    const userInfoUpdate = (user) => {
         setCurrentUser(user);
         userInfoUpdateModalRef.current.showModal();
    }

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
         await axiosSecure.patch(
           `/user/${currentUser._id}/update`,
           updatedData
         );

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


    return (
      <div>
        <div>
          <h1 className="text-3xl font-bold text-center pt-5">
            Users Management Dashboard
          </h1>
          <p className="text-sm text-center md:w-3/4 mx-auto text-base-content/60 pb-7 pt-2">
            This dashboard allows you to efficiently manage all registered
            users. You can view their profiles, update roles such as Admin,
            Tutor, or Student, monitor contact information, and track
            registration details to keep the user database organized and
            up-to-date.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-base-300">
            <table className="table">
              <thead className="bg-[#0D47A1] text-white text-sm">
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

              <tbody>
                {users?.map((user, index) => (
                  <tr key={index} className="hover">
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
                          <div className="font-bold">{user.fullName}</div>
                          <div className="text-sm opacity-50">
                            {user.contactNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* user email */}
                    <td>
                      <span className="badge badge-soft badge-primary px-3">
                        {user.email}
                      </span>
                    </td>

                    {/*User role */}
                    <td>
                      <span
                        className={`badge px-3 py-1 ${
                          user.userRole === "Tutor"
                            ? "badge-secondary"
                            : user.userRole === "Admin"
                            ? " badge-primary"
                            : "badge-neutral"
                        }`}
                      >
                        {user.userRole}
                      </span>
                    </td>

                    {/* Register Time */}
                    <td className="text-sm opacity-70">
                      {new Date(user?.createdAt).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                      })}
                    </td>

                    {/* Update Role */}

                   
                    <td className="space-x-2">
                      <button
                        onClick={() => updateUserRole(user, "Admin")}
                        disabled={user.userRole === "Admin"}
                        className={`btn bg-[#0D47A1] hover:bg-transparent hover:text-black text-white btn-square btn-sm ${
                          user.userRole === "Admin"
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FaUserShield />
                      </button>
                      <button
                        onClick={() => updateUserRole(user, "Student")}
                        disabled={user.userRole === "Student"}
                        className={`btn hover:bg-transparent hover:text-black bg-red-400 text-white btn-square btn-sm ${
                          user.userRole === "Student"
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <GrUserManager />
                      </button>

                      <button
                        onClick={() => updateUserRole(user, "Tutor")}
                        disabled={user.userRole === "Tutor"}
                        className={`btn hover:bg-transparent hover:text-black btn-square bg-green-500 text-white btn-sm ${
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
                        onClick={() => handleUsersViewDetails(user)}
                        className="btn bg-[#0D47A1] hover:bg-transparent hover:text-black text-white btn-square btn-sm"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => userInfoUpdate(user)}
                        className="btn hover:bg-transparent hover:text-black btn-square bg-green-500 text-white btn-sm"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleUserDelete(user)}
                        className="btn hover:bg-transparent hover:text-black bg-red-400 text-white btn-square btn-sm"
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
          <dialog
            ref={userInfoUpdateModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">
                User Info Update Form
              </h3>

              <form
                className="space-y-2"
                onSubmit={handleSubmit(handleUpdateInfo)}
              >
                <div className="form-control w-full md:col-span-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("fullName", { required: true })}
                      placeholder="Enter name"
                      className="input my-1 input-bordered w-full"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-medium">
                        Name is required
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Enter email"
                      readOnly
                      className="input my-1 input-bordered w-full"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium">
                        Email is required
                      </p>
                    )}
                  </div>

                  <label className="label -mb-3.5">User Image</label>
                  <input
                    type="file"
                    {...register("photoURL")}
                    className="file-input w-full file-input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      {" "}
                      Contact number
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("contactNumber", { required: true })}
                    placeholder="Enter contact number"
                    className="input my-1 input-bordered w-full"
                  />
                  {errors.contactNumber && (
                    <p className="text-xs text-red-500 font-medium">
                      Contact Number is required
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">User Role</span>
                  </label>
                  <input
                    type="text"
                    {...register("userRole", { required: true })}
                    placeholder="Enter user role"
                    className="input  my-1 input-bordered w-full"
                  />
                  {errors.userRole && (
                    <p className="text-xs text-red-500 font-medium">
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
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/* User details View */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog
            ref={userDetailsModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box p-6 sm:p-8 rounded-xl bg-white shadow-lg max-w-lg">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={currentUser?.photoURL || "/default-avatar.png"}
                    alt={currentUser?.photoURL || "Student"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentUser?.fullName || "No Name"}
                  </h3>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-gray-700">
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Contact Number</p>
                  <p>{currentUser?.contactNumber || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Role</p>
                  <p>{currentUser?.userRole || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-600">Register Time</p>
                  <p>
                    {new Date(currentUser?.createdAt).toLocaleString("en-GB", {
                      timeZone: "Asia/Dhaka",
                    }) || "-"}{" "}
                  </p>
                </div>
              </div>

              {/* Details */}
              {currentUser?.details && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <p className="font-semibold text-gray-600 mb-1">Details</p>
                  <p className="text-gray-700 text-sm">{currentUser.details}</p>
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
      </div>
    );
};

export default UsersManagement;
