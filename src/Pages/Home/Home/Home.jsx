import React, { useState } from 'react';
import Hero from '../Hero/Hero';
import AllTags from '../AllTags/AllTags';
import PostList from '../PostList/PostList';

const Home = () => {
    const [selectedTag, setSelectedTag] = useState(null);
    return (
        <div>
            <Hero></Hero>
            <AllTags selectedTag={selectedTag} setSelectedTag={setSelectedTag}></AllTags>
            <PostList selectedTag={selectedTag} ></PostList>
        </div>
    );
};

export default Home;