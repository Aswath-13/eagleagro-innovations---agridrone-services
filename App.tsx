import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';

// ✅ Lazy imports for smoother, faster navigation (no visual "loading" delay)
const pageImports = {
  Home: () => import('./components/Homepage'),
  About: () => import('./components/About'),
  Services: () => import('./components/Services'),
  Technology: () => import('./components/TechnologyPage'),
  'Case Studies': () => import('./components/CaseStudiesPage'),
  Gallery: () => import('./components/Gallery'),
  Contact: () => import('./components/Contact'),
};

const Homepage = lazy(pageImports.Home);
const About = lazy(pageImports.About);
const Services = lazy(pageImports.Services);
const TechnologyPage = lazy(pageImports.Technology);
const CaseStudiesPage = lazy(pageImports['Case Studies']);
const Gallery = lazy(pageImports.Gallery);
const Contact = lazy(pageImports.Contact);

const LoadingIndicator: React.FC = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent-green"></div>
  </div>
);


export type Page =
  | 'Home'
  | 'About'
  | 'Services'
  | 'Technology'
  | 'Case Studies'
  | 'Gallery'
  | 'Contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  // ✅ Theme setup (light/dark ready)
  const darkThemePages: Page[] = [];
  const theme = darkThemePages.includes(currentPage) ? 'dark' : 'light';

  // ✅ Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // ✅ Preload heavy assets and page components after initial load
  useEffect(() => {
    const preloadAssets = () => {
      // Preload all page components
      Object.values(pageImports).forEach(importFn => importFn());

      // Preload all critical images
      const imagesToPreload = [
        '/images/home/hero-background.jpg',
        '/images/about/team-collaboration.jpg',
        '/images/about/neyan.png',
        '/images/services/service-inspections.jpg',
        '/images/services/service-surveys.jpg',
        '/images/services/grid-overlay.jpg',
        '/images/case-studies/1.png',
        '/images/case-studies/2.png',
        '/images/case-studies/3.png',
      ];

      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    // Run preloading after a short delay to not interfere with initial page render
    const timer = setTimeout(preloadAssets, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Render page dynamically
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Homepage onNavigate={setCurrentPage} />;
      case 'About':
        return <About onNavigate={setCurrentPage} />;
      case 'Services':
        return <Services onNavigate={setCurrentPage} />;
      case 'Technology':
        return <TechnologyPage theme={theme} />;
      case 'Case Studies':
        return <CaseStudiesPage />;
      case 'Gallery':
        return <Gallery onNavigate={setCurrentPage} />;
      case 'Contact':
        return <Contact />;
      default:
        return <Homepage onNavigate={setCurrentPage} />;
    }
  };

  // ✅ Theme classes
  const themeClasses = {
    light: 'bg-light-bg text-light-text',
    dark: 'bg-dark-bg text-dark-text',
  };

  // ✅ Page fade animation (fast, no flicker)
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -8 },
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration: 0.25,
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} theme={theme} />

      <main>
        <Suspense fallback={<LoadingIndicator />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer theme={theme} onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
