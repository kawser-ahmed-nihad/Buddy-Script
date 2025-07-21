import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import AdminProfile from '../../Admin/AdminProfile/AdminProfile';
import MyProfile from '../MyProfile/MyProfile';

const UserHome = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>; 
  }


  if (user.role === 'admin') {
    return <AdminProfile />;
  }


  return <MyProfile />;
};

export default UserHome;
