

import React from 'react';
import { motion } from 'framer-motion';

const CaseStudyCard: React.FC<{
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}> = ({ category, title, description, imageUrl }) => (
  <motion.div 
    className="bg-light-bg rounded-lg overflow-hidden shadow-lg h-full"
    whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <p className="text-accent-green font-semibold text-sm uppercase mb-2">{category}</p>
      <h3 className="text-xl font-bold text-light-text mb-3">{title}</h3>
      <p className="text-light-text-secondary">{description}</p>
    </div>
  </motion.div>
);

const CaseStudiesPage: React.FC = () => {
  const studies = [
    {
      category: 'Agriculture',
      title: 'Boosting Crop Yield by 20% with Multispectral Analysis',
      description: 'Partnered with a large-scale farm to identify crop stress and optimize irrigation, leading to a significant increase in yield and reduction in water usage.',
      imageUrl: '/images/case-studies/1.png',
    },
    {
      category: 'Construction',
      title: 'Saving 150+ Hours on a Major Construction Site Survey',
      description: 'Provided weekly aerial surveys for a commercial development project, enabling project managers to track progress accurately and resolve logistical issues proactively.',
      imageUrl: '/images/case-studies/2.png',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // FIX: Added 'as const' to prevent TypeScript from widening the type of 'ease'.
  // framer-motion expects a specific string literal for this property, not the general 'string' type.
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;


  return (
    <section id="case-studies" className="py-16 md:py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-light-text">Case Studies</h1>
          <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">
            Real-world examples of how our drone solutions create value and drive results for our clients.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          {studies.map((study, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CaseStudyCard {...study} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesPage;