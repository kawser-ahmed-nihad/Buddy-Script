import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users?search=${searchTerm}`);
            return res.data;
        },
        enabled: true,
    });

    const handleMakeAdmin = async (id) => {
        try {
            const res = await axiosSecure.patch(`/api/users/admin/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire('✅ Updated!', 'User is now admin.', 'success');
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire('❌ Error!', 'Failed to update role.', 'error');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <input
                type="text"
                placeholder="Search by name..."
                className="mb-4 p-2 border rounded w-full md:w-1/3"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading ? (
                <div className="text-center"> Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Subscription</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.role}</td>
                                    <td className="py-2 px-4 border-b">{user.status}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
