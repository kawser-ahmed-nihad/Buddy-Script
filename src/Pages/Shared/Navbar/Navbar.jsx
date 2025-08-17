import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire("Logged out!", "", "success");
      }
    });
  };

  //  Announcements with react-query
  const {
    data: announcements = [],
    refetch,
    isLoading: announcementsLoading,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/announcements');
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="flex justify-end md:px-16  items-center py-4">
        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-[#cc5429] underline underline-offset-4'
      : 'hover:text-[#cc5429] transition';

  return (
    <header className="bg-[#ffffff] fixed top-0 w-full z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#cc5429] ">EchoVerse</h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/membership" className={navLinkClass}>Membership</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
          <li>
            <div className="relative cursor-pointer" onClick={refetch}>
              <FiBell className="hover:text-[#cc5429] text-xl" />
              {announcements.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#cc5429] text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {announcements.length}
                </span>
              )}
            </div>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <NavLink to="/login" className="bg-[#cc5429] text-white px-4 py-2 rounded hover:bg-[#e35b2c] transition">Join Us</NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-[#cc5429] cursor-pointer object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-50 p-3 space-y-2 animate-dropdown origin-top transition-all duration-300 flex flex-col ease-out">
                  <p className="font-semibold text-sm">{user.displayName}</p>
                  <NavLink to="/dashboard" className="text-sm font-medium text-black hover:text-[#cc5429]">Dashboard</NavLink>
                  <button onClick={handleLogOut} className="text-sm font-medium text-[#cc5429] text-left ">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden">
          <FiMenu className="w-6 h-6 text-[#cc5429]" />
        </button>
      </nav>

      {/* Backdrop Blur */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-72 h-full bg-[#ffffff] z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-3 border-b border-black">
          <h2 className="text-lg text-[#cc5429] font-semibold">EchoVerse</h2>
          <FiX className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
        </div>

        <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
          {user && (
            <div className="flex items-center gap-2">
              <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border-2 border-[#ff00e2] object-cover" />
              <span>{user.displayName}</span>
            </div>
          )}

          <li><NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/membership" onClick={() => setMobileOpen(false)} className={navLinkClass}>Membership</NavLink></li>

          {user && <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-yellow-300">Dashboard</NavLink>}

          {/*  Mobile Bell */}
          <li>
            <div className="relative cursor-pointer" onClick={refetch}>
              <FiBell className="text-xl hover:text-[#cc5429]" />
              {announcements.length > 0 && (
                <span className="absolute -top-1 left-2 bg-[#cc5429] text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {announcements.length}
                </span>
              )}
            </div>
          </li>

          {!user ? (
            <NavLink
              to="/login"
              className="bg-[#cc5429] text-white px-4 py-2 rounded text-center hover:bg-[#e35b2c] transition"
              onClick={() => setMobileOpen(false)}
            >
              Join Us
            </NavLink>
          ) : (
            <button onClick={handleLogOut} className="bg-[#cc5429] text-white px-4 py-2 hover:bg-[#e35b2c] rounded text-center transition">Logout</button>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
