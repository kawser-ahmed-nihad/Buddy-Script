import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router';
import { FiBell, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const closeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    const handleLogout = () => {
        logOut();
        setDropdownOpen(false);
        setMobileOpen(false);
    };

    if (loading) {
        return <div className="flex justify-end md:px-16 bg-[#303F9F] items-center py-4">
            <div className="w-8 h-8 border-4 border-t-[#ff00e2] border-gray-200 rounded-full animate-spin"></div>
        </div>
    }

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-pink-300 underline underline-offset-4'
            : 'hover:text-pink-200 transition';

    return (
        <header className="bg-[#303F9F] text-white fixed top-0 w-full z-50 shadow-md">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center">
                    {/* <img src={logo} alt="logo" className="w-16 h-16 " /> */}
                    <h1 className="text-xl font-bold ">EchoVerse</h1>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                    <li><NavLink to="/membership" className={navLinkClass}>Membership</NavLink></li>
                    <li><FiBell className="hover:text-[#E91E63] cursor-pointer" /></li>
                </ul>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-4">
                    {!user ? (
                        <NavLink to="/login" className="bg-[#ff00e2] text-white px-4 py-2 rounded hover:bg-[#ff00e2] transition">Join Us</NavLink>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-10 h-10 rounded-full border-2 border-[#ff00e2] cursor-pointer object-cover"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-50 p-3 space-y-2 
               animate-dropdown origin-top transition-all duration-300 flex flex-col ease-out"
                                >
                                    <p className="font-semibold text-sm">{user.displayName}</p>
                                    <NavLink to="/dashboard" className="block text-sm hover:text-[#303F9F]">Dashboard</NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 text-left text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setMobileOpen(true)} className="md:hidden">
                    <FiMenu className="w-6 h-6 text-[#E91E63]" />
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
            <div className={`fixed top-0 right-0 w-full h-full bg-[#303F9F] text-white z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
                    <h2 className="text-lg font-semibold">EchoVerse</h2>
                    <FiX className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
                </div>

                <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
                    {
                        user && <>
                            <div className="flex items-center gap-2">
                                <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border-2 border-[#ff00e2] object-cover" />
                                <span>{user.displayName}</span>
                            </div>

                        </>
                    }
                    <li><NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkClass}>Home</NavLink></li>
                    <li><NavLink to="/membership" onClick={() => setMobileOpen(false)} className={navLinkClass}>Membership</NavLink></li>
                    {
                        user && <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-yellow-300">Dashboard</NavLink>
                    }
                    <li><FiBell className="hover:text-[#E91E63] cursor-pointer" /></li>

                    {!user ? (
                        <NavLink
                            to="/login"
                            className="bg-[#E91E63] text-white px-4 py-2 rounded text-center transition"
                            onClick={() => setMobileOpen(false)}
                        >
                            Join Us
                        </NavLink>
                    ) : (
                        <>

                            <button onClick={handleLogout} className="text-red-300 text-left hover:underline">Logout</button>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
