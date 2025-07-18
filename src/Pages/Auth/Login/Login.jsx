import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        setLoginError("");

        loginUser(data.email, data.password)
            .then((res) => {
                const user = res.user;

                if (!user.emailVerified) {
                    Swal.fire("Login Failed", "Please verify your email before login.", "warning");
                    return;
                }

                Swal.fire("Login Successful", `Welcome back, ${user.displayName || 'User'}!`, "success");
                navigate(location.state?.from || "/");
            })
            .catch((err) => {
                // Custom error messages
                if (err.code === 'auth/user-not-found') {
                    setLoginError("No account found with this email.");
                } else if (err.code === 'auth/wrong-password') {
                    setLoginError("Password is incorrect.");
                } else if (err.code === 'auth/invalid-email') {
                    setLoginError("Invalid email address.");
                } else {
                    setLoginError("Login failed. Please try again.");
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>EchoVerse || Login</title>
            </Helmet>
            <div className=" bg-white flex dark:text-white items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6">
                    <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-300">Sign in to your account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="space-y-4">

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm font-medium  text-gray-700">
                                        Password
                                    </label>
                                    <Link to="/forgot" className="text-sm text-indigo-500 hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: "Password is required" })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff00e2]"
                            >
                                Login
                            </button>
                        </div>
                        {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        Don’t have an account? <Link to="/signup" className='text-blue-500 hover:text-blue-400'>Sign Up</Link>
                    </p>
                    <SocialLogin></SocialLogin>
                </div>

            </div>
        </>
    );
};

export default Login;
