// AboutUs.jsx
import React from "react";
import { FaLightbulb, FaHandshake, FaRocket, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  { name: "Alice Johnson", role: "CEO", img: "https://randomuser.me/api/portraits/women/44.jpg", social: { linkedin: "#", twitter: "#", email: "#" } },
  { name: "Bob Smith", role: "CTO", img: "https://randomuser.me/api/portraits/men/46.jpg", social: { linkedin: "#", twitter: "#", email: "#" } },
  { name: "Clara Lee", role: "Designer", img: "https://randomuser.me/api/portraits/women/47.jpg", social: { linkedin: "#", twitter: "#", email: "#" } },
];

const AboutUs = () => {
  return (
    <div className="font-sans text-gray-800  px-4 md:px-16 py-28 space-y-20">
      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition">
          <FaLightbulb className="text-4xl text-yellow-500 mb-3" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Deliver innovative solutions to empower individuals and communities globally.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition">
          <FaRocket className="text-4xl text-red-500 mb-3" />
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            Be a global leader with integrity, creativity, and excellence in everything we do.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow flex flex-col items-center hover:shadow-lg transition">
              <div className="w-32 h-32 overflow-hidden rounded-full mb-4">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 mb-3">{member.role}</p>
              <div className="flex gap-4 text-xl">
                <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-800"><FaLinkedin /></a>
                <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
                <a href={member.social.email} className="text-gray-600 hover:text-gray-800"><FaEnvelope /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col items-center hover:bg-blue-100 transition">
            <FaLightbulb className="text-4xl text-blue-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-700 text-center">We embrace creative solutions and push boundaries.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow flex flex-col items-center hover:bg-green-100 transition">
            <FaHandshake className="text-4xl text-green-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-700 text-center">We uphold honesty and strong ethical standards.</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow flex flex-col items-center hover:bg-red-100 transition">
            <FaRocket className="text-4xl text-red-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-700 text-center">We strive for the highest quality in everything we do.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
