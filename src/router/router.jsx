import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import Resgister from '../Pages/Auth/Resgister/Resgister';
import PrivateRoute from '../context/PrivateRoute/PrivateRoute';
import NotFoundPage from '../Components/NotFoundPage';



const router = createBrowserRouter([

    {
        path: "/",
        Component: Login
    },
    {
        path: "signup",
        Component: Resgister
    },

    {
        path: "/dashbord",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
        ]
    },


    {
        path: '*',
        element: <NotFoundPage />,
    }

]);

export default router;