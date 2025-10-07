import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks: { label: Page; sublinks?: Page[] }[] = [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Services' },
    { label: 'Technology' },
    { label: 'Case Studies' },
    { label: 'Gallery' },
  ];

  const handleMobileNav = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const themeClasses = {
    light: {
      bg: 'bg-light-bg/80 backdrop-blur-sm shadow-md',
      text: 'text-light-text',
      hover: 'hover:text-accent-green',
      logoAccent: 'text-accent-green',
      button: 'bg-accent-green hover:bg-accent-green-hover text-white',
      progressBar: 'bg-accent-green',
      mobileMenuBg: 'bg-light-bg',
    },
    dark: {
      bg: 'bg-dark-bg/80 backdrop-blur-sm shadow-lg',
      text: 'text-dark-text',
      hover: 'hover:text-accent-neon',
      logoAccent: 'text-accent-neon',
      button: 'bg-accent-neon hover:bg-accent-neon-hover text-dark-bg',
      progressBar: 'bg-accent-neon',
      mobileMenuBg: 'bg-dark-bg',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? currentTheme.bg : 'bg-transparent'}`}
      >
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 origin-left ${currentTheme.progressBar}`}
          style={{ scaleX: scrollYProgress }}
        />
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* This is the site logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('Home'); }}
            className="flex items-center space-x-3"
          >
            <img
              src="/images/logo.jpg"
              alt="Eagle Agro Innovations Logo"
              className="h-12 w-auto rounded-md"
            />
            <span className={`hidden sm:inline text-xl font-bold tracking-wider ${currentTheme.text}`}>
              EAGLE<span className={currentTheme.logoAccent}>AGRO</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(link.label); }}
                className={`text-base font-medium transition-colors duration-300 ${
                  currentPage === link.label
                    ? currentTheme.logoAccent
                    : `${currentTheme.text} ${currentTheme.hover}`
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('Contact'); }}
            className={`hidden md:inline-block font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${currentTheme.button}`}
          >
            Contact Us
          </a>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${currentTheme.text}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 top-[72px] z-40 ${currentTheme.mobileMenuBg}`}
          >
            <div className="container mx-auto px-6 pt-8 flex flex-col h-full">
              <nav className="flex flex-col space-y-6 text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleMobileNav(link.label); }}
                    className={`text-2xl font-semibold ${
                      currentPage === link.label
                        ? currentTheme.logoAccent
                        : currentTheme.text
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto pb-16 text-center">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleMobileNav('Contact'); }}
                  className={`w-full inline-block font-semibold py-4 px-8 rounded-lg shadow-md text-lg ${currentTheme.button}`}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
