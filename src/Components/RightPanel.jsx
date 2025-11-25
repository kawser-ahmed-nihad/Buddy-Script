import React from 'react';
import { FiSearch } from "react-icons/fi";
const RightPanel = () => {
    return (
        <div className="w-full space-y-6 mt-24">


            <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center  mb-4">
                    <h2 className="text-sm font-semibold text-gray-700 ">You Might Like</h2>
                    <button className="text-xs text-blue-500 font-medium hover:underline">See All</button>
                </div>
                <hr className=' text-gray-300' />
                <div className="flex items-center pt-2 gap-3">
                    <img
                        src="https://i.pravatar.cc/60"
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Radovan SkillArena</h3>
                        <p className="text-xs text-gray-500">Founder & CEO at Techtly</p>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <button className="border border-gray-300 px-4 py-1 rounded-md text-sm hover:bg-gray-100">
                        Ignore
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600">
                        Follow
                    </button>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Your Friends</h2>
                    <button className="text-xs text-blue-500 font-medium hover:underline">See All</button>
                </div>

            
                <div className="relative mb-4">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Input search text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </div>

               
                <div className="space-y-3">

                    {[
                        "Steve Jobs",
                        "Ryan Kolsomky",
                        "Dylan Field",
                        "Elena Ador",
                        "Chris Nolan",
                        "Kevin Powell"
                    ].map((name, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://i.pravatar.cc/4${index}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="text-sm font-medium text-gray-800">{name}</h4>
                                    <p className="text-xs text-gray-500">6 min ago</p>
                                </div>
                            </div>

                        
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightPanel;