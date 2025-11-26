import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";

import shape1 from "../../../assets/shape1.png";
import dark_shape from "../../../assets/dark_shape.svg";
import shape2 from "../../../assets/shape2.svg";
import dark_shape1 from "../../../assets/dark_shape1.svg";
import shape3 from "../../../assets/shape3.svg";
import dark_shape2 from "../../../assets/dark_shape2.svg";
import login from "../../../assets/login.png";
import logo from "../../../assets/logo.svg";
import google from "../../../assets/google.svg";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
  const navigate = useNavigate();

  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/login",
        data,
        { withCredentials: true } // JWT cookie receive
      );

      toast.success("Login Successful!", { duration: 2500 });

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashbord");
      }, 700);

    } catch (error) {
      const msg = error?.response?.data?.message;

      if (msg) {
        toast.error(msg);
        setError("backendError", { message: msg });
      }
    }
  };

  return (
    <div className="bg-[#f0f2f5] relative pb-10 overflow-hidden">

      {/* Background Shapes */}
      <div className="hidden lg:flex flex-col absolute top-0 left-0 z-0">
        <img className="w-36" src={shape1} />
        <img className="w-36 relative -top-[440px]" src={dark_shape} />
      </div>

      <div className="hidden lg:flex flex-col absolute top-0 -right-32 z-0">
        <img className="w-9/12" src={shape2} />
        <img
          className="w-9/12 opacity-[0.05] relative -top-[400px]"
          src={dark_shape1}
        />
      </div>

      <div className="hidden lg:flex flex-col absolute top-[500px] right-0 z-0">
        <img className="w-full" src={shape3} />
        <img
          className="w-full opacity-[0.05] relative -top-[550px]"
          src={dark_shape2}
        />
      </div>

      {/* Main Section */}
      <div className="lg:py-28 relative z-10">
        <div className="gird grid-cols-1 lg:flex justify-center items-center max-w-5xl mx-auto">

          {/* Left Image */}
          <div>
            <img className=" lg:w-11/12" src={login} />
          </div>

          {/* Login Form */}
          <div className=" m-4  lg:ml-4">
            <div className=" w-full bg-white flex flex-col items-center justify-center rounded-xl">

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:w-96 w-80 space-y-8 p-12 flex flex-col items-center justify-center"
              >
                <img className="object-cover" src={logo} />
                <h3 className="text-xl text-[#2D3748] mt-3">Welcome Back</h3>
                <h1 className="text-[#212529] text-2xl font-medium">Login</h1>

                <button
                  type="button"
                  className="w-full mt-6 gap-2 border border-[#f0f2f5] flex items-center justify-center h-12 rounded-md font-medium"
                >
                  <img src={google} />
                  Login with Google
                </button>

                <div className="divider mb-10">OR</div>

                {/* BACKEND ERROR */}
                {errors.backendError && (
                  <p className="text-red-600 text-sm">
                    {errors.backendError.message}
                  </p>
                )}

                {/* Email */}
                <div className="mb-6 w-full">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-6 w-full">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-400"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full py-3 rounded-md text-white bg-[#1890ff] hover:opacity-90 font-medium"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p className="text-gray-500/90 text-[11px] mt-4">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-[#1890ff] hover:underline">
                    Create New Account
                  </Link>
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
