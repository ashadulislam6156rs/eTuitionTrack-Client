import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../../assets/eTuitionTrack-logo.png";
import Container from "../Container/Container";
import { HiUserAdd } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import useRole from "../../Hooks/useRole";
import Loading from "../Loading/Loading";

import { MdDashboard } from "react-icons/md";
import { useTheme } from "../../Context/ThemeProvider";

const Navbar = () => {
  const { user, setUser, userLogOut } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

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
    if (role === "Admin") {
      navigate("/dashboard/users-management");
    }
    if (role === "Student") {
      navigate("/dashboard/my-tuitions");
    }
    if (role === "Tutor") {
      navigate("/dashboard/my-applications");
    }
  };

  // const handleTheme = (checked) => {
  //   setTheme(checked ? "dark" : "light");
  // };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-[#F57C00] bg-transparent"
              : "hover:text-[#F57C00] bg-transparent flex items-center"
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
      {user && (
        <li>
          <button
            onClick={handleClick}
            className="hover:text-[#F57C00] bg-transparent"
          >
            Dashboard
          </button>
        </li>
      )}
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

  return (
    <div className="dark:bg-gray-900">
      <Container>
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden dark:text-gray-200"
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
                className="menu menu-sm font-bold text-[#0D47A1] dark:text-gray-200 dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
            <ul className="menu menu-horizontal font-bold text-[#0D47A1] dark:text-gray-200 px-1">
              {links}
            </ul>
          </div>

          {/* Nav End */}
          <div className="navbar-end flex items-center gap-3">
            {/* Theme Control */}
            <label className="toggle text-base-content">
              <input
                type="checkbox"
                value="synthwave"
                className="theme-controller"
                onChange={(e) => toggleTheme(e.target.checked)}
                checked={theme === "dark"}
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>

            {user ? (
              /* User Dropdown */
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar flex items-center"
                >
                  <div className="w-10 h-10 border-2 border-[#29B6F6] dark:border-blue-400 rounded-full overflow-hidden">
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Avatar"
                      src={
                        user?.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu bg-[#fdf7e4] dark:bg-gray-800 menu-sm dropdown-content rounded-box mt-4 w-52 p-2 shadow-lg shadow-gray-500 dark:shadow-gray-700 z-9999"
                >
                  <div className="ml-3 pb-2">
                    <h1 className="font-semibold pb-1 text-base text-gray-900 dark:text-gray-100 leading-tight">
                      {user?.displayName}
                    </h1>

                    <div
                      className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full 
                  bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200
                  text-xs font-medium"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 
               10 10 10-4.48 10-10S17.52 2 12 2zm-1 
               15l-4-4 1.41-1.41L11 14.17l5.59-5.59 
               L18 10l-7 7z"
                        />
                      </svg>

                      <span className="capitalize">{role}</span>
                    </div>
                  </div>

                  <li className="text-[#0D47A1] dark:text-gray-200 font-bold rounded-sm border border-white dark:border-gray-600">
                    <button
                      onClick={handleClick}
                      className="hover:text-[#F57C00] bg-transparent text-left w-full px-2 py-1 flex items-center gap-2"
                    >
                      <MdDashboard className="text-base" />
                      Dashboard
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={handleUserLogOut}
                      className="btn myBtn mt-2 btn-sm w-full flex items-center justify-center gap-2"
                    >
                      LogOut
                      <IoLogOutOutline className="text-base font-bold" />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn myBtn flex items-center gap-2">
                <HiUserAdd />
                LogIn
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
