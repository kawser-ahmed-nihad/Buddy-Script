import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import event1 from '../assets/feed_event1.png'

const events = [
  {
    id: 1,
    img: event1, 
    date: { day: "10", month: "Jul" },
    title: "No more terrorism no more cry",
    people: "17 People Joining",
  },
  {
    id: 2,
    img: event1,
    date: { day: "10", month: "Jul" },
    title: "No more terrorism no more cry",
    people: "17 People Joining",
  },
];

const EventCard = ({ event }) => (
  <div className="bg-white flex flex-col shadow-md rounded-xl p-3 gap-4  hover:shadow-lg transition">

    <img
      src={event.img}
      alt=""
      className="object-cover rounded-lg"
    />

 
    <div className="flex flex-col justify-between w-full">
   
      <div className="flex gap-3">
        <div className="bg-teal-500 text-white px-2 py-1 rounded-lg text-center">
          <p className="text-lg font-bold leading-none">{event.date.day}</p>
          <p className="text-[13px] leading-none">{event.date.month}</p>
        </div>

        <p className="font-medium text-gray-800 text-sm">
          {event.title}
        </p>
      </div>

    
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-500 text-xs">{event.people}</p>

        <button className="text-xs border border-blue-500 px-3 py-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">
          Joining
        </button>
      </div>
    </div>
  </div>
);

const EventsSection = () => {
  return (
    <div className="bg-white shadow-sm p-5 rounded-xl">
     
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[15px] font-semibold text-gray-700">Events</h3>
        <button className="text-blue-500 text-sm flex items-center gap-1 hover:underline">
          See all <IoIosArrowForward size={14} />
        </button>
      </div>

  
      <div className="space-y-3">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
