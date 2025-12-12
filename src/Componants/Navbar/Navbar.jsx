import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from "../../assets/eTuitionTrack-logo.png"
import Container from '../Container/Container';
import { HiUserAdd } from 'react-icons/hi';
import useAuth from '../../Hooks/useAuth';
import { IoLogOutOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Navbar = () => {
  const { user, setUser, userLogOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  
   const { data: users = [] } = useQuery({
     queryKey: ["users", user?.email],
     queryFn: async () => {
       const res = await axiosSecure(`/users?email=${user?.email}`);
       return res.data;
     },
   });

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/tuitions"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent"
          }
        >
          Tuitions
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/tutors"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent"
          }
        >
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  const handleUserLogOut = () => {

    userLogOut()
      .then(() => {
        setUser(null);
        toast.success(
          "You've been logged out successfully. See you again soon!"
        );
      })
      .catch((err) => toast.error(`${err.message}`));
  };


  const handleClick = () => {
    if (users?.userRole === "Admin") {
      navigate("/dashboard/users-managment");
    } 
    if (users?.userRole === "Student") {
       navigate("/dashboard/my-tuitions");
    }
    if (users?.userRole === "Tutor") {
      navigate("/dashboard/my-applications");
    }
  };

  return (
    <div className="">
      <Container>
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              {/* Small Device Links */}
              <ul
                tabIndex="-1"
                className="menu menu-sm font-bold text-[text-[#0D47A1]] dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link to={"/"} className="w-30 h-10">
              <img className="w-30 h-10" src={logo} alt="website logo" />
            </Link>
          </div>
          {/* Large Device  Links*/}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal font-bold text-[text-[#0D47A1]] px-1">
              {links}
            </ul>
          </div>

          {/* Nav End  */}
          <div className="navbar-end">
            {user ? (
              <>
                {/* Dropdown ***************/}
                <div className="dropdown relative mt-3 z-9999 dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu bg-[#fdf7e4] menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow-lg shadow-gray-500"
                  >
                    <li className='className=" text-[#0D47A1] font-bold rounded-sm border border-white'>
                      <NavLink
                        to={"/profile-settings"}
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#0D47A1]"
                            : "hover:text-[#F57C00] bg-transparent"
                        }
                      >
                        Profile Settings
                      </NavLink>
                    </li>

                    <li className="text-[#0D47A1] font-bold rounded-sm border border-white">
                      <button
                        onClick={handleClick}
                        className="hover:text-[#F57C00] bg-transparent text-left w-full px-2 py-1"
                      >
                        Dashboard
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={handleUserLogOut}
                        className="btn myBtn mt-2 btn-sm"
                      >
                        LogOut{" "}
                        <IoLogOutOutline className="inline-block text-base font-bold" />
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to={"/login"} className="btn myBtn">
                <HiUserAdd className="inline-block" /> LogIn
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;