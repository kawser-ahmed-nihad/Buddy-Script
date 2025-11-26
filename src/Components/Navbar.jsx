import { FiSearch } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import logo from '../assets/logo.svg'
import profile from '../assets/profile.png'
import { useQuery } from "@tanstack/react-query";

import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";
import useAxios from "../hooks/useAxios";

const Navbar = () => {
    const axiosInstance = useAxios();



    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosInstance.get("/profile", {
                withCredentials: true,
            });
            return res.data;
        },
    });



    // console.log(user);

    return (
        <div className="bg-white shadow-sm z-10 fixed top-0 w-full">
            <div className=" max-w-11/12 mx-auto ">

                <div className="px-6 py-5 hidden lg:flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-7"
                        />
                    </div>


                    <div className="w-[350px] bg-gray-100 rounded-full flex items-center px-4 h-12">
                        <FiSearch className="text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="input search text"
                            className="ml-2 w-full bg-transparent outline-none text-gray-600"
                        />
                    </div>

                    {/* Right: Icons + User */}
                    <div className="flex items-center gap-8">



                        <div className="relative group flex flex-col items-center cursor-pointer px-3 pb-2">
                            <HiOutlineHome className="text-3xl text-[#1773EA]" />
                            <div className="
                    absolute -bottom-6 h-[2px] w-8 bg-[#1773EA] rounded-full
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-300
                "></div>
                        </div>


                        <div className="relative group flex flex-col items-center cursor-pointer px-3 pb-2">
                            <HiUsers className="text-3xl text-gray-500 group-hover:text-[#1773EA] duration-150" />
                            <div className="
                    absolute -bottom-6 h-[2px] w-8 bg-[#1773EA] rounded-full
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-300
                "></div>
                        </div>


                        <div className="relative group flex flex-col items-center cursor-pointer px-3 pb-2">
                            <div className="relative">
                                <IoNotificationsOutline className="text-3xl text-gray-500 group-hover:text-[#1773EA] duration-150" />
                                <span className="absolute -top-2 -right-2 bg-[#1773EA] text-white text-[10px] px-[6px] py-[1px] rounded-full">6</span>
                            </div>
                            <div className="
                    absolute -bottom-6 h-[2px] w-8 bg-[#1773EA] rounded-full
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-300
                "></div>
                        </div>


                        <div className="relative group flex flex-col items-center cursor-pointer px-3 pb-2">
                            <div className="relative">
                                <IoChatbubbleEllipsesOutline className="text-3xl text-gray-500 group-hover:text-[#1773EA] duration-150" />
                                <span className="absolute -top-2 -right-2 bg-[#1773EA] text-white text-[10px] px-[6px] py-[1px] rounded-full">2</span>
                            </div>
                            <div className="
                    absolute -bottom-6 h-[2px] w-8 bg-[#1773EA] rounded-full
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-300
                ">

                            </div>
                        </div>

                        {
                            isLoading ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-600">Loading...</span>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <img
                                            src={profile}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <span className="font-medium text-gray-700">
                                            {user?.name || "User"}
                                        </span>
                                        <span className="text-xl text-gray-500">
                                            <IoIosArrowDown />
                                        </span>
                                    </div>
                                </>
                            )
                        }



                    </div>
                </div>


            </div>

            {/* mobile */}
            <div className=" lg:hidden px-6 py-5 ">

                <div className="flex items-center  justify-between gap-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-7"
                    />
                    <div>
                        <FiSearch className="text-gray-500 text-lg" />
                    </div>
                </div>

            </div>

            <div className="lg:hidden fixed bottom-0 border-t border-gray-300 left-0 w-full bg-white shadow-md z-50">
                <div className="max-w-11/12 mx-auto">
                    <div className="flex items-center justify-between px-6 py-3">

                        <div className="flex flex-col items-center cursor-pointer">
                            <HiOutlineHome className="text-3xl text-[#1773EA]" />
                        </div>

                        <div className="flex flex-col items-center cursor-pointer">
                            <HiUsers className="text-3xl text-gray-500" />
                        </div>

                        <div className="flex flex-col items-center cursor-pointer relative">
                            <IoNotificationsOutline className="text-3xl text-gray-500" />
                            <span className="absolute -top-2 -right-2 bg-[#1773EA] text-white text-[10px] px-[6px] py-[1px] rounded-full">6</span>
                        </div>

                        <div className="flex flex-col items-center cursor-pointer relative">
                            <IoChatbubbleEllipsesOutline className="text-3xl text-gray-500" />
                            <span className="absolute -top-2 -right-2 bg-[#1773EA] text-white text-[10px] px-[6px] py-[1px] rounded-full">2</span>
                        </div>

                    </div>
                </div>
            </div>



        </div >
    );
};

export default Navbar;
