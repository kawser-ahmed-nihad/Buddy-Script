import React from 'react';
import DashbordNav from '../Pages/Dasbord/DasbordNav/DashbordNav';
import { Outlet } from 'react-router';

const DashbordLayout = () => {
    return (
        <div className='bg-[#f7f7f7]'>
            <div className=' md:grid-cols-12 py-5 mx-auto grid w-11/12'>
                <div className=' md:col-span-3'>
                    <DashbordNav />
                </div>

              
                <div className='col-span-1 md:col-span-9'>
                    <Outlet />
                </div>
            </div>
        </div>


    );
};

export default DashbordLayout;