import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-green-50/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text">
            Join Our Network
          </h1>
          <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-2xl mx-auto">
            Are you a skilled drone pilot or a drone owner looking to collaborate?
            Choose the appropriate form below to connect with us.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-6 mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <a
            href="https://forms.zohopublic.in/eagleagrodroneinnovations1/form/DronePilotApplicationForm/formperma/RZ5eNmEg0XvX2v7QI2d45IkIRLYJe7talGDj6XG-37c"
            target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-hover text-white font-bold py-3 px-8 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg text-center"
          >
            Drone Pilot & Freelancer Application
          </a>
          <a
            href="https://forms.zohopublic.in/eagleagrodroneinnovations1/form/DroneOwnerContactForm/formperma/0L3leXGKbBLmdnr7JOCGq6lZTtGicaUAAoEx8YkOuy0"
            target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white border-2 border-accent-green text-accent-green hover:bg-accent-green hover:text-white font-bold py-3 px-8 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg text-center"
          >
            Drone Owner Contact Form
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
