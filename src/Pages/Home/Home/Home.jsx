import React, { useEffect, useState } from 'react';
import Hero from '../Hero/Hero';
import AllTags from '../AllTags/AllTags';
import PostList from '../PostList/PostList';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';

const Home = () => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (selectedTag) {
            setSearchTerm('');
        }
    }, [selectedTag]);

    return (
        <div>
            <Hero setSearchTerm={setSearchTerm} />
            <AllTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-7xl mt-12 mx-auto">
                {/* Announcement (mobile = up, desktop = right) */}
                <div className="order-1 lg:order-2 col-span-1 lg:col-span-3 px-4 md:px-0">
                    <AnnouncementSection />
                </div>

                {/* PostList (mobile = down, desktop = left) */}
                <div className="order-2 lg:order-1 col-span-1 lg:col-span-9">
                    <PostList selectedTag={selectedTag} searchTerm={searchTerm} />
                </div>
            </div>

        </div>
    );
};

export default Home;
