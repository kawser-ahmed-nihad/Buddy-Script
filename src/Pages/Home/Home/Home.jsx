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
            <AnnouncementSection></AnnouncementSection>
            <PostList selectedTag={selectedTag} searchTerm={searchTerm} />
        </div>
    );
};

export default Home;
