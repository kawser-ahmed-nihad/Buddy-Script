import { Navigate, useLocation } from "react-router";

import { useQuery } from '@tanstack/react-query';

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const { data: isAdmin, isLoading: adminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/admin/${user.email}`);
            return res.data.admin;
        },
    });

    if (loading || adminLoading) return <div>Loading...</div>;

    if (user && isAdmin) return children;

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
