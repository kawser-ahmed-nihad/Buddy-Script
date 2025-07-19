import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import hero from '../../../assets/Hero.jpg';

const Hero = ({ setSearchTerm }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      setSearchTerm(searchText.trim());
      setSearchText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className="relative h-[450px] bg-cover bg-center text-white flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3F51B5]/80 to-[#3F51B5]/40 z-0"></div>
      <div className="relative z-10 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="italic font-extrabold">EchoVerse</span>
        </h1>
        <p className="text-white/90 mb-8">
          Search discussions by any keyword and explore insightful conversations.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search by any tag..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full md:w-[500px] px-6 py-4 bg-white rounded-full text-gray-800 focus:outline-none shadow-md"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-[#3F51B5] px-6 py-4 rounded-full flex items-center gap-2 shadow-md hover:bg-gray-100"
          >
            <FaSearch />
            <span className="font-semibold">SEARCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
