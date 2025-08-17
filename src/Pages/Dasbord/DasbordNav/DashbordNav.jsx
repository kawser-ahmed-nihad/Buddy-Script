import React, { useState } from 'react';
import {
  FiMenu, FiUser, FiEdit, FiTag, FiUsers, FiSpeaker, FiMessageCircle, FiGrid,
  FiAlertCircle
} from 'react-icons/fi';
import { NavLink } from 'react-router'; 
import useAdmin from '../../../hooks/useAdmin';

const DashbordNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin();

 
  const userMenuItems = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { name: 'Add Post', icon: <FiEdit />, path: '/dashboard/add-post' },
    { name: 'My Posts', icon: <FiUser />, path: '/dashboard/my-posts' },
    { name: 'My Comments', icon: <FiMessageCircle />, path: '/dashboard/comments' },
  ];

  
  const adminMenuItems = [
    { name: 'Add Tags', icon: <FiTag />, path: '/dashboard/add-tags' },
    { name: 'Reported Activities', icon: <FiAlertCircle />, path: '/dashboard/reported-activities' },
    { name: 'Manage Users', icon: <FiUsers />, path: '/dashboard/user' },
    { name: 'Make Announcement', icon: <FiSpeaker />, path: '/dashboard/announcement' },
  ];

 
  const menuItems = isAdmin ? [...userMenuItems, ...adminMenuItems] : userMenuItems;

  return (
    <>
      <div className="md:hidden flex justify-between items-center px-4 py-3 shadow-sm bg-white">
        <NavLink to="/" className="text-lg font-bold text-[#cc5429]">EchoVerse</NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-700"
        >
          <FiMenu />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`bg-white shadow-sm p-4 w-60 h-screen fixed  left-0 z-50 transition-transform duration-300 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:h-screen`}
      >
        <div className="mb-6 py-5 hidden md:block text-center">
          <NavLink to="/" className="text-lg font-bold text-[#cc5429]">EchoVerse</NavLink>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3">Menu</p>
          <ul className="space-y-2">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-black
                    ${isActive
                      ? 'text-[#cc5429] underline underline-offset-4'
                      :  'hover:text-[#cc5429] transition'}`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="inline">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashbordNav;
