

import React from 'react';
import { motion } from 'framer-motion';
import type { Page } from '../App';

const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// Updated team members to reflect new leadership.
const teamMembers: {
  name: string;
  role: string;
  imageUrl: string;
  department: 'Leadership' | 'Technical' | 'Operations';
  description: string;
}[] = [
  {
    name: 'A. Neyan',
    role: 'Founder & Director',
    imageUrl: '/images/about/neyan.png',
    department: 'Leadership',
    description: 'Visionary leader driving drone innovation in agriculture and infrastructure.',
  },
  {
    name: 'Hariharan S',
    role: 'Co-Founder & Managing Director',
    imageUrl: '/images/about/hari.png',
    department: 'Leadership',
    description: 'Expert strategist ensuring operational excellence and sustainable growth.',
  },
];


const TeamMemberCard: React.FC<{ name: string; role: string; imageUrl: string; department: 'Leadership' | 'Technical' | 'Operations'; description: string; }> = ({ name, role, imageUrl, department, description }) => {
  const departmentClasses = {
    Leadership: 'text-accent-green',
    Technical: 'text-blue-600',
    Operations: 'text-orange-600',
  };
  const departmentClass = departmentClasses[department] || 'text-light-text-secondary';
  const isLeader = department === 'Leadership';

  return (
    <motion.div 
      className="text-center group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className={`relative ${isLeader ? 'w-40 h-40' : 'w-32 h-32'} mx-auto overflow-hidden rounded-full shadow-lg transition-all duration-300 ${isLeader ? 'ring-4 ring-accent-green/30 group-hover:ring-accent-green/70' : ''}`}>
        <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-light-text">{name}</h3>
      <p className={`text-base font-semibold ${departmentClass}`}>{role}</p>
      <p className="text-sm text-light-text-secondary mt-2 max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
};

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <>
      <section id="about" className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-accent-green font-semibold">ABOUT US</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-light-text mt-2 mb-4">Pioneering Aerial Solutions for a Better Future</h1>
              <p className="text-base md:text-lg text-light-text-secondary mb-6">
                Eagle Agro was founded on the principle that advanced technology can solve real-world problems. We specialize in deploying state-of-the-art drone technology to provide critical data and operational support to industries vital to our economy and environment.
              </p>
              <div className="space-y-4">
                  <div className="flex items-start">
                      <CheckmarkIcon className="w-6 h-6 text-accent-green mt-1 mr-3 flex-shrink-0" />
                      <p className="text-light-text-secondary"><strong className="text-light-text">Our Mission:</strong> To deliver precise, efficient, and safe aerial data solutions that empower our clients to make smarter decisions.</p>
                  </div>
                  <div className="flex items-start">
                      <CheckmarkIcon className="w-6 h-6 text-accent-green mt-1 mr-3 flex-shrink-0" />
                      <p className="text-light-text-secondary"><strong className="text-light-text">Our Vision:</strong> To be the leading force in the drone service industry, driving innovation and sustainability across all sectors we serve.</p>
                  </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img 
                src="/images/about/team-collaboration.jpg" 
                alt="Eagle Agro Team of engineers collaborating over a drone" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 bg-green-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-light-text">Meet the EagleAgro Leadership</h2>
            <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">
              The dedicated experts driving our mission forward with passion and precision.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-text mb-4">Ready to Elevate Your Operations?</h2>
            <p className="text-base md:text-lg text-light-text-secondary max-w-2xl mx-auto mb-8">
              Discover how our advanced drone services can bring unparalleled efficiency and insight to your projects.
            </p>
            <button
              onClick={() => onNavigate('Services')}
              className="bg-accent-green hover:bg-accent-green-hover text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
            >
              Explore Our Services
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
