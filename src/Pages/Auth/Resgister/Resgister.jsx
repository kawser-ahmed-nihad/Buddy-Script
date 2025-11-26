import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import shape1 from "../../../assets/shape1.png";
import dark_shape from "../../../assets/dark_shape.svg";
import shape2 from "../../../assets/shape2.svg";
import dark_shape1 from "../../../assets/dark_shape1.svg";
import shape3 from "../../../assets/shape3.svg";
import dark_shape2 from "../../../assets/dark_shape2.svg";
import registration from "../../../assets/registration.png";
import logo from "../../../assets/logo.svg";
import google from "../../../assets/google.svg";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm();

  const password = watch("password");

  // SEND DATA TO BACKEND
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/registerUser", data);
      toast.success("Register Successful!", { duration: 2500 });

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/");
      }, 700);
      reset();
    } catch (error) {
      const msg = error?.response?.data?.message;

      // Show backend error under form
      if (msg) {
        setError("backendError", { message: msg });
      }
    }
  };



  return (
    <>
      <Helmet>
        <title>Buddy Script | Register</title>
      </Helmet>
      <div className="bg-[#f0f2f5] relative pb-10 overflow-hidden">

        {/* Background shapes */}
        <div className=" hidden lg:flex flex-col absolute top-0 left-0 z-0">
          <img className="w-36" src={shape1} />
          <img className="w-36 relative -top-[440px]" src={dark_shape} />
        </div>

        <div className=" hidden lg:flex flex-col absolute top-0 -right-32 z-0">
          <img className="w-9/12" src={shape2} />
          <img className="w-9/12 opacity-[0.05] relative -top-[400px]" src={dark_shape1} />
        </div>

        <div className=" hidden lg:flex flex-col absolute top-[500px] -right-0 z-0">
          <img className="w-12/12" src={shape3} />
          <img className="w-12/12 opacity-[0.05] relative -top-[550px]" src={dark_shape2} />
        </div>

        {/* Main */}
        <div className=" lg:py-28 relative z-10">
          <div className=" gird grid-cols-1 lg:flex justify-center items-center max-w-5xl mx-auto">

            <div>
              <img src={registration} alt="" />
            </div>

            <div>
              <div className=" mx-4 lg:w-full lg:mx-0 bg-white flex flex-col items-center justify-center rounded-xl">

                <form
                  className="md:w-96 w-80 p-12 flex flex-col items-center justify-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <img className="object-cover" src={logo} />
                  <h3 className="text-xl text-[#2D3748] mt-3">Get Started Now</h3>
                  <h1 className="text-[#212529] text-2xl font-medium">Registration</h1>

                  {/* Google Button */}
                  <button
                    type="button"
                    className="w-full mt-8 gap-2 border border-[#f0f2f5] flex items-center justify-center h-12 rounded-md font-medium"
                  >
                    <img src={google} />
                    Register with Google
                  </button>

                  <div className="divider mb-10">OR</div>

                  {/* BACKEND ERROR */}
                  {errors.backendError && (
                    <p className="text-red-600 text-sm mb-2">
                      {errors.backendError.message}
                    </p>
                  )}

                  {/* NAME */}
                  <div className="mb-4 w-full">
                    <label className="mb-1 block text-sm font-medium">Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* LAST NAME */}
                  <div className="mb-4 w-full">
                    <label className="mb-1 block text-sm font-medium">Last Name</label>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="mb-4 w-full">
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email format",
                        },
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-4 w-full">
                    <label className="mb-1 block text-sm font-medium">Password</label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                          message: "Must include 1 capital & 1 special character",
                        },
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="mb-4 w-full">
                    <label className="mb-1 block text-sm font-medium">Repeat Password</label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Confirm password required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full gap-2">
                    <input type="checkbox" {...register("terms", { required: "Accept terms" })} />
                    <label className="text-sm">
                      I agree to terms & conditions
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-sm">{errors.terms.message}</p>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-8 w-full py-3 rounded-md text-white bg-[#1890ff] hover:opacity-90 font-medium"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <p className="text-gray-500/90 text-[11px] mt-4">
                    Already have an account?{" "}
                    <Link to="/" className="text-[#1890ff] hover:underline">
                      Login
                    </Link>
                  </p>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
