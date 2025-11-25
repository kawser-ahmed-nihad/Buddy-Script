import React from 'react';

import {
    FaPlayCircle,
    FaChartBar,
    FaUserPlus,
    FaBookmark,
    FaUsers,
    FaGamepad,
    FaCog,
    FaSave
} from "react-icons/fa";
import SuggestedPeople from './SuggestedPeople';
import EventsSection from './EventsSection';

const Sidebar = () => {
    const items = [
        { icon: <FaPlayCircle className="w-5 h-5" />, label: "Learning" },
        { icon: <FaChartBar className="w-5 h-5" />, label: "Insights" },
        { icon: <FaUserPlus className="w-5 h-5" />, label: "Find friends" },
        { icon: <FaBookmark className="w-5 h-5" />, label: "Bookmarks" },
        { icon: <FaUsers className="w-5 h-5" />, label: "Group" },
        { icon: <FaGamepad className="w-5 h-5" />, label: "Gaming", new: true },
        { icon: <FaCog className="w-5 h-5" />, label: "Settings" },
        { icon: <FaSave className="w-5 h-5" />, label: "Save post" },
    ];

    return (
        <>
            <div className="bg-white shadow-md  rounded-xl p-5 mt-24">
                <h2 className="text-lg font-semibold mb-4">Explore</h2>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-gray-700 group-hover:text-black transition">
                                    {item.label}
                                </span>
                            </div>

                            {item.new && (
                                <span className="bg-emerald-400 ml-8 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                    NEW
                                </span>
                            )}
                        </div>
                    ))}


                </div>
            </div>

            <div className='space-y-5 pt-5'>
                <SuggestedPeople></SuggestedPeople>
                <EventsSection></EventsSection>
            </div>
        </>
    );
};

export default Sidebar;