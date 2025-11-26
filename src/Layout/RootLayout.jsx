import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router';
import RightPanel from '../Components/RightPanel';

const RootLayout = () => {
    return (
        <div>
            <div className="bg-[#f0f2f5] overflow-hidden">
                <Navbar />

                <div className="grid lg:grid-cols-12 max-w-11/12 mx-auto overflow-hidden">


                    <aside className=" hidden lg:flex flex-col col-span-3 pb-5 overflow-y-auto">
                        <Sidebar />
                    </aside>


                    <main className="col-span-6  overflow-y-auto">
                        <Outlet />
                    </main>


                    <aside className="hidden lg:flex flex-col col-span-3  overflow-y-auto">
                        <RightPanel />
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default RootLayout;