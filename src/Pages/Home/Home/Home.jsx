import React from 'react';
import StoryBar from '../StoryBar/StoryBar';
import PostInput from '../PostInput/PostInput';
import PostCard from '../PostCard/PostCard';

const Home = () => {
    return (
        <div className=' px-4'>
            <StoryBar></StoryBar>
            <PostInput></PostInput>
            <PostCard></PostCard>
        </div>
    );
};

export default Home;