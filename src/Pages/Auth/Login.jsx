import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiUserAdd } from "react-icons/hi";
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userSignInGoogle, userLogIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLogInUser = (data) => {
    userLogIn(data.email, data.password)
      .then(() => {
        toast.success("Your Account LogIn Successfull.");
        setTimeout(() => {
          navigate(location?.state || "/");
        }, 500);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleLogInGoogle = () => {
    userSignInGoogle()
      .then((res) => {
        // ** User Info  Store the database
        const userData = {
          fullName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
          userRole: "Student",
        };
        axiosSecure.post("/users", userData).then(() => {
          navigate(location?.state || "/");
        });
        toast.success("Your Account LogIn Successfull.");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <title>User login | eTutionTrack</title>
      <div className="card md:card-side bg-base-100 dark:bg-gray-800 shadow-2xl dark:shadow-gray-950/50 max-w-5xl w-full rounded-2xl overflow-hidden">
        {/* Left Side: Form Section */}
        <div className="card-body w-full lg:w-1/2 p-8 sm:p-12">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-gray-100">
              Welcome Back
            </h1>
            <p className="text-base-content/60 dark:text-gray-400 mt-2">
              Log in to continue managing your tuition platform seamlessly.
            </p>
          </div>

          {/* Social Login */}
          <button
            onClick={handleLogInGoogle}
            className="btn btn-outline w-full text-base font-medium hover:bg-base-200 dark:hover:bg-gray-700 hover:text-base-content dark:hover:text-gray-100 border-base-300 dark:border-gray-600 dark:text-gray-300 transition-all"
          >
            <FcGoogle size={24} />
            Login with Google
          </button>

          <div className="divider text-base-content/40 dark:text-gray-500 text-sm">
            OR
          </div>

          <form onSubmit={handleSubmit(handleLogInUser)} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Email Address
                </span>
              </label>
              <label className="input mt-1 w-full input-bordered dark:bg-gray-900 dark:border-gray-600 flex items-center gap-2 focus-within:ring-2 ring-primary/20 dark:ring-blue-500/30">
                <MdEmail className="text-base-content/50 dark:text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="mail@site.com"
                  className="grow dark:text-gray-100 dark:placeholder-gray-500"
                  {...register("email", { required: true })}
                />
              </label>
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 pt-2 font-semibold">
                  Email is required
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control mb-1">
              <label className="label">
                <span className="label-text dark:text-gray-300 font-semibold">
                  Password
                </span>
              </label>
              <label className="input mt-1 w-full input-bordered dark:bg-gray-900 dark:border-gray-600 flex items-center gap-2 focus-within:ring-2 ring-primary/20 dark:ring-blue-500/30 relative">
                <MdLock className="text-base-content/50 dark:text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="grow dark:text-gray-100 dark:placeholder-gray-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters!",
                    },
                    validate: {
                      hasUpper: (value) =>
                        /[A-Z]/.test(value) ||
                        "Must include at least 1 uppercase letter!",
                      hasLow: (value) =>
                        /[a-z]/.test(value) ||
                        "Must include at least 1 lowercase letter!",
                      hasNum: (value) =>
                        /\d/.test(value) || "Must include at least 1 number!",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs btn-circle btn-ghost absolute right-2 text-lg text-base-content/60 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </label>

              {/* Validation Hint (Optional styling) */}
              {errors.password ? (
                <p className="text-red-500 dark:text-red-400 mt-1">
                  {errors.password.message}
                </p>
              ) : (
                <p className="text-xs text-base-content/50 dark:text-gray-500 mt-2 ml-1">
                  Must contain 6+ chars, 1 uppercase, 1 lowercase & 1 number.
                </p>
              )}
            </div>

            <Link className="text-primary dark:text-blue-400 font-bold hover:underline transition-colors">
              Forget Password?
            </Link>

            {/* Login Button */}
            <button className="btn w-full mt-2 myBtn">
              <HiUserAdd className="inline-block" /> LogIn
            </button>
          </form>

          <p className="text-center text-sm text-base-content/70 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-primary dark:text-blue-400 font-bold hover:underline transition-colors"
            >
              Register Now!
            </Link>
          </p>
        </div>

        {/* Right Side: Visual/Image Section */}
        <div className="w-full lg:w-1/2 bg-primary/5 dark:bg-gray-900/50 flex-col items-center justify-center p-8 relative overflow-hidden hidden md:flex">
          {/* Decorative circles for background effect */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/10 dark:bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 dark:bg-purple-500/10 blur-3xl"></div>

          <div className="z-10 text-center">
            <div className="avatar mb-6">
              <div className="w-64 rounded-xl shadow-2xl dark:shadow-gray-950/50 ring ring-primary dark:ring-blue-500 ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2">
                <img
                  src="https://i.pinimg.com/736x/3a/e9/84/3ae984b45b22e9faea5e9e8bdab22304.jpg"
                  alt="Login Illustration"
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-base-content dark:text-gray-100 mb-2">
              Let's get started!
            </h2>
            <p className="text-base-content/70 dark:text-gray-400 max-w-sm mx-auto">
              Join{" "}
              <span className="text-primary dark:text-blue-400 font-bold">
                eTuitionTrack
              </span>{" "}
              and simplify your education management today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
