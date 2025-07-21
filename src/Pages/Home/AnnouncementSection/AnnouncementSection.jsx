import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AnnouncementSection = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: announcements = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/announcements');
            return res.data;
        },
    });


    return (
        <>
            {
                announcements && <> <div className=" max-w-7xl mx-auto mt-8 ">
                    <h2 className="text-white bg-blue-700 px-4 py-2 rounded-t text-lg font-semibold">
                        Latest Announcements
                    </h2>
                    <div className="space-y-3 max-w-sm px-4 py-3">
                        {announcements.map((announcement) => (
                            <div key={announcement._id} className="">
                                <p className="font-medium text-gray-800">{announcement.title} | <span className='text-sm'> {new Date(announcement.createdAt).toLocaleString()}</span></p>
                                <p className="text-sm text-gray-500">
                                    Description: {announcement.description} 
                                </p>
                            </div>
                        ))}

                    </div>
                </div></>
            }
        </>
    );
};

export default AnnouncementSection;
