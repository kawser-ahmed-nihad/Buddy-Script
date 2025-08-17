import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { sendEmailVerification } from 'firebase/auth';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Resgister = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;

        updateUser({
          displayName: data.name,
          photoURL: data.photo
        }).then(() => {
          //  Step 3: Email verification
          sendEmailVerification(user).then(() => {
            Swal.fire(
              "Registration Successful!",
              "Please check your email inbox or spam folder to verify your account before login.",
              "success"
            ).then(() => {
              reset();
              navigate('/login');
            });
          }).catch((error) => {
            Swal.fire("Email Error", error.message, "error");
          });
        }).catch((err) => {
          console.error("Profile update failed:", err.message);
        });

      }).catch(err => {
        Swal.fire("Signup Failed", err.message, "error");
      });
  };

  return (
    <>
      <Helmet>
        <title>EchoVerse || Sign up</title>
      </Helmet>
      <div className=" bg-white flex  items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 ">Sign up for an account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Photo */}
              <div>
                <label htmlFor="photo" className="block text-sm font-medium  text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register('photo', { required: 'Photo URL is required' })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium  text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium  text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                      validate: {
                        hasUpper: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
                        hasLower: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
                        hasSpecial: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Must contain a special character',
                      },
                    })}
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

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#cc5429]"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </>
  );
};

export default Resgister;
