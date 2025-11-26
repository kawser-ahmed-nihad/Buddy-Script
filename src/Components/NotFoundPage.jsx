import React from 'react';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-[150px] font-extrabold text-gray-300 leading-none mb-4">404</h1>
      <h2 className="text-4xl font-bold text-gray-700 mb-2">Oops! Page not found</h2>
      <p className="text-gray-500 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="inline-flex items-center bg-orange-500 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300">
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
