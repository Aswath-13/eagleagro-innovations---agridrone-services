import React from 'react';
import { motion } from 'framer-motion';
import type { Page } from '../App';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ServiceSection: React.FC<{
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}> = ({ title, description, features, imageUrl, imageAlt, reverse = false }) => (
  <motion.div
    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
      reverse ? 'md:flex-row-reverse' : ''
    }`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    <div className="md:w-1/2">
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="rounded-lg shadow-2xl w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <div className="md:w-1/2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-light-text mb-4">{title}</h2>
      <p className="text-base md:text-lg text-light-text-secondary mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start p-2 -ml-2 rounded-md transition-colors hover:bg-green-100/50"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <CheckmarkIcon className="w-5 h-5 text-accent-green mt-1 mr-3 flex-shrink-0" />
            <span className="text-light-text-secondary">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const services = [
    {
      title: 'Advanced Aerial Surveys',
      description:
        'We provide high-resolution topographic and land surveys for agriculture, construction, and environmental management. Our drones capture data faster, safer, and more cost-effectively than traditional methods.',
      features: [
        'High-Precision Topographic Maps',
        'Volumetric Analysis & Stockpile Measurement',
        'Crop Health Monitoring (NDVI)',
        'Land Use & Environmental Assessment',
      ],
      imageUrl: '/images/services/service-surveys.jpg', // ✅ your actual file
      imageAlt: 'Wide aerial view of farmland for survey',
    },
    {
      title: 'Critical Infrastructure Inspections',
      description:
        'Safely inspect and monitor vital assets like power lines, wind turbines, bridges, and pipelines. Our thermal and visual sensors detect defects and potential failures before they become critical issues.',
      features: [
        'Thermal & Visual Anomaly Detection',
        '3D Asset Modeling & Digital Twins',
        'Corrosion & Structural Integrity Checks',
        'Reduced Downtime & Increased Safety',
      ],
      imageUrl: '/images/services/service-inspections.jpg', // ✅ your actual file
      imageAlt: 'Drone inspecting a large bridge',
      reverse: true,
    },
    {
      title: 'Precision 2D & 3D Mapping',
      description:
        'Create detailed, georeferenced maps and 3D models of your sites. Essential for project planning, progress monitoring, and as-built verification in construction, real estate, and urban planning.',
      features: [
        'Orthomosaic & Digital Surface Models (DSM)',
        'Construction Site Progress Monitoring',
        'As-Built vs. Design Analysis',
        'High-Fidelity 3D Reality Capture',
      ],
      imageUrl: '/images/services/grid-overlay.jpg', // ✅ your actual file
      imageAlt: 'Satellite-style mapping with a grid overlay',
    },
  ];

  return (
    <>
      {/* --- Header Section --- */}
      <section id="services" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-light-text">Our Services</h1>
            <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">
              Leveraging cutting-edge drone technology to provide actionable insights across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Services Details --- */}
      <section className="py-16 md:py-20 bg-green-50/50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">
            {services.map((service, index) => (
              <ServiceSection key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-text mb-4">
              Have a Specific Project in Mind?
            </h2>
            <p className="text-base md:text-lg text-light-text-secondary max-w-2xl mx-auto mb-8">
              Our team is ready to help you find the perfect aerial solution for your needs.
            </p>
            <button
              onClick={() => onNavigate('Contact')}
              className="bg-accent-green hover:bg-accent-green-hover text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
            >
              Get a Quote
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
