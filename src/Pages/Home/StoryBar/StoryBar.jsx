import React from 'react';

import avatar1 from '../../../assets/people1.png'
import avatar2 from '../../../assets/people2.png'
import avatar3 from '../../../assets/people3.png'
import avatar4 from '../../../assets/people3.png'

const stories = [
  { type: 'yours', name: 'Your Story', avatar: avatar1 },
  { type: 'user', name: 'Ryan Roslansky', avatar:avatar2 },
  { type: 'user', name: 'Ryan Roslansky', avatar: avatar3},
  { type: 'user', name: 'Ryan Roslansky', avatar: avatar4},
];

const StoryBar = () => (
  <div className="flex space-x-4 p-4 overflow-x-auto  mt-24">
    {stories.map((story, index) => (
      <div 
        key={index} 
        className="flex-shrink-0 w-24 h-40 rounded-lg overflow-hidden relative cursor-pointer group"
      >
        <img 
          src={story.avatar} 
          alt={story.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
        />
   
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-2">
          <p className={`text-xs text-white font-medium ${story.type === 'yours' ? 'font-bold' : ''}`}>
            {story.name}
          </p>
        </div>
        
   
        {story.type === 'user' && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center text-xs">
            
            <span className="text-gray-600">
                <img src={avatar1} alt="" />
            </span> 
          </div>
        )}
      </div>
    ))}
  </div>
);

export default StoryBar;