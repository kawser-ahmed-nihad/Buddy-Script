import React from 'react';
import { Link } from 'react-router';

import errorPng from '../../../assets/404.png'
import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (

        <>
            <Helmet>
                <title> EchoVerse|| Page not Found</title>
            </Helmet>

            <div className="min-h-screen  dark:bg-gray-800   dark:text-white flex flex-col justify-center items-center bg-white px-4 text-center">
                <img
                    src={errorPng}
                    alt="404 illustration"
                    className="w-full max-w-md mx-auto mb-8"
                />

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Oops! page not found
                </h1>

                <p className="text-gray-600 text-lg mb-6">
                    Sorry, We can't find the page you're looking.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition duration-300"
                >
                    Back To Home →
                </Link>
            </div>
        </>
    );
};

export default NotFound;
