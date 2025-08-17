import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import Resgister from '../Pages/Auth/Resgister/Resgister';
import DashbordLayout from '../Layout/DashbordLayout';
import AddPost from '../Pages/Dasbord/User/AddPost/AddPost';
import UserHome from '../Pages/Dasbord/User/UserHome/UserHome';
import MyPosts from '../Pages/Dasbord/User/MyPosts/MyPosts';
import ManageUsers from '../Pages/Dasbord/Admin/ManageUsers/ManageUsers';
import AddTags from '../Pages/Dasbord/Admin/AddTags/AddTags';
import Announcement from '../Pages/Dasbord/Admin/Announcement/Announcement';
import Comments from '../Pages/Dasbord/User/Comments/CommentsDetails';
import PaymentPage from '../Pages/Membership/PaymentPage/PaymentPage';
import PrivateRoute from '../context/PrivateRoute/PrivateRoute';
import PostDetails from '../Pages/Home/PostDetails/PostDetails';
import MyProfile from '../Pages/Dasbord/User/MyProfile/MyProfile';
import CommentsDetails from '../Pages/Dasbord/User/Comments/CommentsDetails';
import AdminReportsPage from '../Pages/Dasbord/Admin/AdminReportsPage/AdminReportsPage';
import AdminProfile from '../Pages/Dasbord/Admin/AdminProfile/AdminProfile';
import AdminRoute from '../context/PrivateRoute/AdminRoute';
import NotFoundPage from '../Pages/Shared/NotFoundPage/NotFoundPage';
import Contact from '../Pages/Shared/contact/Contact';



const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "membership",
                element: <PrivateRoute> <PaymentPage></PaymentPage></PrivateRoute>
            },
            {
                path: "/posts/:id",
                element: <PrivateRoute> <PostDetails></PostDetails></PrivateRoute>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashbordLayout></DashbordLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: UserHome
            },
            {
                path: 'add-post',
                Component: AddPost
            },
            {
                path: 'add-tags',
                element: <AdminRoute><AddTags></AddTags></AdminRoute>
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'reported-activities',
                element: <AdminRoute><AdminReportsPage></AdminReportsPage></AdminRoute>
            },
            {
                path: 'comments/:postId',
                element: <CommentsDetails></CommentsDetails>
            },
            {
                path: 'user',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'my-posts',
                Component: MyPosts
            },
            {
                path: 'announcement',
                element: <AdminRoute><Announcement></Announcement></AdminRoute>
            },
            {
                path: 'comments',
                Component: Comments
            },
        ]

    },
    {
        path: "login",
        Component: Login
    },
    {
        path: "signup",
        Component: Resgister
    },
    {
        path: '*',
        element: <NotFoundPage />,
    }

]);

export default router;