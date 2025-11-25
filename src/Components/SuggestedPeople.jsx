import { Link } from "react-router";

import Avatar1 from '../assets/people1.png'
import Avatar2 from '../assets/people2.png'
import Avatar3 from '../assets/people3.png'


const peopleData = [
    { name: 'Steve Jobs', title: 'CEO of Apple', avatar: Avatar3 },
    { name: 'Ryan Roslansky', title: 'CEO of LinkedIn', avatar: Avatar2 },
    { name: 'Dylan Field', title: 'CEO of Figma', avatar: Avatar1 },
];

const SuggestedPeople = () => (
    <div className="p-5 bg-white rounded-xl">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Suggested People</h2>
            <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">See All</Link>
        </div>

        {peopleData.map((person, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.title}</p>
                    </div>
                </div>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 border  rounded-md hover:bg-blue-500 hover:text-white">
                    Connect
                </button>
            </div>
        ))}
    </div>
);

export default SuggestedPeople;