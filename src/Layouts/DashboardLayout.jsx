import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { IoHomeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { MdAddCard, MdAssignment, MdLibraryBooks, MdOutlinePayments } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import useRole from "../Hooks/useRole";
import Loading from "../Componants/Loading/Loading";
import { FaClock } from "react-icons/fa6";

const DashboardLayout = () => {
 
  const { role, roleLoading } = useRole();
  
 

  if (roleLoading) {
      <Loading></Loading>
    }
      return (
        <div className="max-w-7xl mx-auto">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Navbar */}
              <nav className="navbar w-full bg-[#fdf7e4b6] shadow-lg">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  {/* Sidebar toggle icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M14 10l2 2l-2 2"></path>
                  </svg>
                </label>
                <div className="px-4 text-[#F57C00] font-bold text-xl">
                  eTuition<span className="text-[#29B6F6]">Track</span>
                </div>
              </nav>
              {/* Page content here *******************************/}
              <div className="p-4 bg-base-300 min-h-screen">
                <Outlet></Outlet>
              </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="flex min-h-full flex-col items-start bg-white md:bg-[#29b5f642] is-drawer-close:w-14 is-drawer-open:w-64">
                {/* Sidebar content here *************************** */}
                <ul className="menu w-full grow font-semibold text-[#0D47A1]">
                  {/* List item */}
                  <li>
                    <NavLink
                      to={"/"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#F57C00]"
                          : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      }
                      data-tip="Home"
                    >
                      {/* Home icon */}
                      <IoHomeOutline className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">Home</span>
                    </NavLink>
                  </li>

                  {/* My Profile */}
                  <li>
                    <NavLink
                      to={"/dashboard/my-profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#F57C00]"
                          : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      }
                      data-tip="My Profile"
                    >
                      
                      {/* User Profile icon */}
                      <IoPersonCircleOutline className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">My Profile</span>
                    </NavLink>
                  </li>

                  {/* Tutor Route ***************** */}
                  {role === "Tutor" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/my-applications"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="My Applications"
                        >
                          {/* Home icon */}
                          <MdAssignment className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            My Applications
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/my-ongoing-tuitions"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Ongoing Tuitions"
                        >
                          {/* Home icon */}
                          <FaClock className="my-1.5 inline-block size-4" />

                          <span className="is-drawer-close:hidden">
                            Ongoing Tuitions
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/revenue-history"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Revenue History"
                        >
                          {/* Home icon */}
                          <AiOutlineLineChart className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Revenue History
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {/* Student Route ***************** */}
                  {role === "Student" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/my-tuitions"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="My Tuitions"
                        >
                          {/* Home icon */}
                          <FaChalkboardTeacher className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            My Tuitions
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/add-tuition"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Add Tuition"
                        >
                          {/* Home icon */}
                          <MdAddCard className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Add Tuition
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/applied-tutors"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Applied Tutors"
                        >
                          {/* Home icon */}
                          <LuClipboardList className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Applied Tutors
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/payments-history"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Payments History"
                        >
                          {/* Home icon */}
                          <MdOutlinePayments className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Payments History
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {/* Admin Route *************** */}
                  {role === "Admin" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/users-management"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Users Management"
                        >
                          {/* Home icon */}
                          <HiUserGroup className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Users Management
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/tuition-management"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Tuition Management"
                        >
                          {/* Home icon */}
                          <MdLibraryBooks className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Tuition Management
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/reports-analytics"}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#F57C00]"
                              : "is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          }
                          data-tip="Reports & Analytics"
                        >
                          {/* Home icon */}
                          <BsGraphUpArrow className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden">
                            Reports & Analytics
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* toast */}
          <ToastContainer />
        </div>
      );
};

export default DashboardLayout;
