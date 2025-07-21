import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();

    const { data: admin = {}, isLoading: loadingProfile } = useQuery({
        queryKey: ['adminProfile'],
        queryFn: () => axiosSecure.get('/profile').then(res => res.data),
        enabled: !!axiosSecure
    });

    const { data: stats = {}, isLoading: loadingStats } = useQuery({
        queryKey: ['adminStats'],
        queryFn: () => axiosSecure.get('/stats').then(res => res.data),
    });

    if (loadingProfile || loadingStats)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold text-gray-600">Loading...</div>
            </div>
        );


    const chartData = {
        labels: ['Users', 'Announcements', 'Reports', 'Actions Taken'],
        datasets: [
            {
                label: 'System Stats',
                data: [
                    stats.totalUsers || 0,
                    stats.announcementCount || 0,
                    stats.reportCount || 0,
                    stats.actionsTaken || 0,
                ],
                backgroundColor: ['#2563EB', '#059669', '#D97706', '#DC2626'],
                hoverOffset: 40,
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
            {/* Profile Section */}
            <div className="flex items-center gap-8 mb-10">
                <img
                    src={admin.image}
                    alt="Admin Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
                />
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">{admin.name}</h1>
                    <p className="text-gray-600 text-lg mt-1">{admin.email}</p>
                    <span className="inline-block mt-3 bg-yellow-400 text-yellow-900 font-semibold px-4 py-1 rounded-full shadow-sm">
                        Admin
                    </span>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    System Overview
                </h2>
                <div className="max-w-md mx-auto">
                    <Pie data={chartData} />
                </div>

                {/* Percentage Breakdown */}
                <div className="mt-6 space-y-2">
                    {chartData.labels.map((label, index) => {
                        const value = chartData.datasets[0].data[index];
                        const total = chartData.datasets[0].data.reduce((sum, val) => sum + val, 0);
                        const percentage = total ? ((value / total) * 100).toFixed(1) : 0;

                        return (
                            <div
                                key={label}
                                className="flex justify-between text-gray-700 text-sm border-b py-1"
                            >
                                <span className="font-medium">{label}</span>
                                <span>{value} ({percentage}%)</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
