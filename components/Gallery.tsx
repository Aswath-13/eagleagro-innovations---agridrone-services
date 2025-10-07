import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../App';

interface GalleryProps {
  onNavigate: (page: Page) => void;
}

// --- Icons for Lightbox & Zoom ---
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const allImages = [
  { src: '/images/gallery/agri drone flying.png', alt: 'Agricultural drone flying in field', title: 'Aerial Spraying in Action' },
  { src: '/images/gallery/agri drone parts explain.png', alt: 'Explaining agricultural drone parts', title: 'Technical Walkthrough' },
  { src: '/images/gallery/agri drone.png', alt: 'Agricultural drone on ground', title: 'Our Flagship Drone' },
  { src: '/images/gallery/college event  speaker.png', alt: 'Speaker at college event', title: 'Inspiring Future Innovators' },
  { src: '/images/gallery/college event.png', alt: 'Drone presentation at college event', title: 'University Outreach' },
  { src: '/images/gallery/drone flying on government scheme.png', alt: 'Drone flying under government scheme', title: 'Government Scheme Demo' },
  { src: '/images/gallery/event.png', alt: 'Event showcasing drones', title: 'Industry Expo' },
  { src: '/images/gallery/explaining agri drone.png', alt: 'Instructor explaining drone to students', title: 'Hands-On Drone Training' },
  { src: '/images/gallery/group pic with students.png', alt: 'Group photo with students', title: 'Student Workshop' },
  { src: '/images/gallery/in colllege.jpg', alt: 'Drone demonstration inside college', title: 'Campus Demonstration' },
  { src: '/images/gallery/lecture on drones.jpg', alt: 'Lecture session on drones', title: 'Knowledge Sharing Session' },
  { src: '/images/gallery/on event inaugraton.jpg', alt: 'Event inauguration', title: 'Event Inauguration' },
  { src: '/images/gallery/other.png', alt: 'Miscellaneous drone activity', title: 'Field Operations' },
  { src: '/images/gallery/other 1.png', alt: 'Miscellaneous image 1', title: 'Drone Operations' },
  { src: '/images/gallery/speaking in another college.png', alt: 'Speaker in another college event', title: 'Guest Lecture' },
  { src: '/images/gallery/teaching girls to operate remote.png', alt: 'Teaching students drone remote control', title: 'Remote Control Training' },
  { src: '/images/gallery/teaching students.png', alt: 'Drone training for students', title: 'Engaging with Students' },
  { src: '/images/gallery/training student.png', alt: 'Drone training session', title: 'Practical Training Session' },
];

const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [shuffledImages, setShuffledImages] = useState<typeof allImages>([]);

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % shuffledImages.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + shuffledImages.length) % shuffledImages.length);
  };

  useEffect(() => {
    // Fisher-Yates shuffle algorithm to randomize the image order on mount
    const shuffleArray = (array: typeof allImages) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledImages(shuffleArray(allImages));
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, shuffledImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const lightboxVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0 }),
  };
  return (
    <>
      <section id="gallery" className="py-16 md:py-20 bg-green-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-light-text">
              Our Work in Action
            </h1>
            <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">
              Explore our aerial missions — from vast farmlands to educational outreach and live drone training.
            </p>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {shuffledImages.map((image, index) => (
              <motion.div
                key={image.src}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1"
                variants={itemVariants}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <MagnifyingGlassIcon className="text-white w-12 h-12" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            >
              <XMarkIcon />
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300 z-50 p-2 bg-black/20 rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 z-50 p-2 bg-black/20 rounded-full"
            >
              <ArrowRightIcon />
            </button>

            <motion.img
              key={selectedImageIndex}
              custom={selectedImageIndex > (selectedImageIndex - 1 + shuffledImages.length) % shuffledImages.length ? 1 : -1}
              variants={lightboxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              src={shuffledImages[selectedImageIndex].src}
              alt={shuffledImages[selectedImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center p-4 bg-black/30 rounded-lg">
              <p className="text-white text-lg font-semibold">
                {shuffledImages[selectedImageIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-text mb-4">
              See How We Can Help Your Project
            </h2>
            <p className="text-base md:text-lg text-light-text-secondary max-w-2xl mx-auto mb-8">
              Inspired by our work? Let's discuss how our aerial intelligence can be tailored to your specific needs.
            </p>
            <button
              onClick={() => onNavigate('Contact')}
              className="bg-accent-green hover:bg-accent-green-hover text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
            >
              Get a Project Quote
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Gallery;