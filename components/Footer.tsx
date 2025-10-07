
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../App';

const TwitterIcon: React.FC = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
);
const LinkedInIcon: React.FC = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
);
const InstagramIcon: React.FC = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.936 20.644.523 19.86.227c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 2.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227a3.48 3.48 0 01-.896 1.382c-.42.419-.82.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413a3.493 3.493 0 01-1.382-.896 3.493 3.493 0 01-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-2.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.381.42-.42.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.176 8.797 2.16 12 2.16zm0 2.88c-3.255 0-5.91 2.655-5.91 5.91s2.655 5.91 5.91 5.91 5.91-2.655 5.91-5.91-2.655-5.91-5.91-5.91zm0 9.63c-2.04 0-3.72-1.68-3.72-3.72s1.68-3.72 3.72-3.72 3.72 1.68 3.72 3.72-1.68 3.72-3.72 3.72zm4.815-10.335c-.78 0-1.415-.635-1.415-1.415s.635-1.415 1.415-1.415 1.415.635 1.415 1.415-.635 1.415-1.415 1.415z"/></svg>
);
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);


interface FooterProps {
  theme: 'light' | 'dark';
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ theme, onNavigate }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
        setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeClasses = {
    light: {
      bg: 'bg-light-bg-secondary',
      border: 'border-gray-200',
      text: 'text-light-text-secondary',
      textHeader: 'text-light-text',
      hover: 'hover:text-accent-green',
      inputBg: 'bg-white',
      button: 'bg-accent-green hover:bg-accent-green-hover text-white',
    },
    dark: {
      bg: 'bg-dark-bg-secondary',
      border: 'border-gray-800',
      text: 'text-dark-text-secondary',
      textHeader: 'text-dark-text',
      hover: 'hover:text-accent-neon',
      inputBg: 'bg-dark-bg',
      button: 'bg-accent-neon hover:bg-accent-neon-hover text-dark-bg',
    }
  };
  const currentTheme = themeClasses[theme];
  const links: { title: string, items: Page[] }[] = [
    { title: 'Company', items: ['Home', 'About', 'Contact'] },
    { title: 'Services', items: ['Services', 'Technology', 'Case Studies'] },
  ];

  return (
    <>
      <footer 
        className={`border-t ${currentTheme.border} py-12 bg-cover bg-center relative`}
        style={{ backgroundImage: `url('/images/home/footer-background.jpg')` }}
      >
        <div className={`absolute inset-0 ${currentTheme.bg} opacity-90`}></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="col-span-1">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Home'); }} className="inline-block mb-4">
                    <img src="/images/logo.jpg" alt="Eagle Agro Innovations Logo" className="h-12 w-auto mx-auto md:mx-0 rounded-md" />
                  </a>
                  <p className={`mt-2 ${currentTheme.text} text-sm`}>Your partner in precision drone services, helping visions take flight.</p>
                  <div className={`mt-4 text-sm ${currentTheme.text}`}>
                      <p><strong className={theme === 'light' ? 'text-accent-green' : 'text-accent-neon'}>Arifa Innovation and Incubation Center</strong></p>
                      <address className="not-italic mt-1 leading-relaxed">
                          Esanoor Village, Keelaiyur TK,<br />
                          Nagapattinam, Tamil Nadu 611103
                      </address>
                      <p className="mt-2">📞 95852 99409</p>
                  </div>
              </div>
              {links.map(section => (
                  <div key={section.title}>
                      <h4 className={`font-semibold ${currentTheme.textHeader} mb-4`}>{section.title}</h4>
                      <ul className="space-y-2">
                          {section.items.map(link => (
                              <li key={link}><a href="#" onClick={(e) => { e.preventDefault(); onNavigate(link); }} className={`${currentTheme.text} ${currentTheme.hover} transition-colors`}>{link}</a></li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
          <div className={`mt-10 pt-8 border-t ${currentTheme.border} text-center flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 ${currentTheme.text}`}>
              <div className="text-sm sm:text-left">
                <p>&copy; 2025 Eagle Agro Drone Innovations Pvt Ltd. All rights reserved.</p>
                <p className="mt-1">
                    Developed & Maintained by <a href="https://huromata.com" target="_blank" rel="noopener noreferrer" className={`${currentTheme.hover} underline font-semibold`}>huromata.com</a>
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" onClick={(e) => e.preventDefault()} className={currentTheme.hover}><TwitterIcon /></a>
                <a href="#" onClick={(e) => e.preventDefault()} className={currentTheme.hover}><LinkedInIcon /></a>
                <a href="#" onClick={(e) => e.preventDefault()} className={currentTheme.hover}><InstagramIcon /></a>
              </div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
              onClick={scrollTop}
              className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3 rounded-full shadow-lg transition-colors ${currentTheme.button}`}
              aria-label="Scroll to top"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
          >
              <ArrowUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
