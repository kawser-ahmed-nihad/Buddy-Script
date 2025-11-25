import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';


const AuthProvider = ({ children }) => {

    const axiosInstance = useAxios();


    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosInstance.get("/profile", {
                withCredentials: true,
            });
            return res.data;
        },
        retry: false,
    });



    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
