import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// Define a more specific type for theme classes
type ThemeStyle = {
  accent: string;
  accentBg: string;
  accentHover: string;
  accentBgOpacity: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  secondaryText: string;
  secondaryBg: string;
  buttonText: string;
};

interface TechCardProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  themeClasses: ThemeStyle;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, children, themeClasses }) => (
  <motion.div
    className={`${themeClasses.cardBg} ${themeClasses.cardBorder} p-6 rounded-lg shadow-lg transform hover:-translate-y-2 ${themeClasses.cardHoverBorder} transition-all duration-300`}
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
  >
    <div className="flex items-center mb-4">
      <div className={`${themeClasses.accentBgOpacity} p-3 rounded-full mr-4`}>
        {React.cloneElement(icon, { className: `h-8 w-8 ${themeClasses.accent}` })}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className={themeClasses.secondaryText}>{children}</p>
  </motion.div>
);

const DataVisualizationCard: React.FC<{ title: string; description: string; imageUrl: string; themeClasses: ThemeStyle }> = ({ title, description, imageUrl, themeClasses }) => (
  <motion.div
    className={`${themeClasses.cardBg} rounded-lg overflow-hidden ${themeClasses.cardBorder} shadow-lg`}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
  >
    <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className={themeClasses.secondaryText}>{description}</p>
    </div>
  </motion.div>
);

// Icons
const DroneFleetIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const SensorIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

const AnalyticsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

interface TechnologyPageProps {
  theme: 'light' | 'dark';
}

const TechnologyPage: React.FC<TechnologyPageProps> = ({ theme }) => {
  const themeClasses: { [key in 'light' | 'dark']: ThemeStyle } = {
    light: {
      accent: 'text-accent-green',
      accentBg: 'bg-accent-green',
      accentHover: 'hover:bg-accent-green-hover',
      accentBgOpacity: 'bg-accent-green/10',
      cardBg: 'bg-light-bg',
      cardBorder: 'border border-gray-200',
      cardHoverBorder: 'hover:border-accent-green',
      secondaryText: 'text-light-text-secondary',
      secondaryBg: 'bg-light-bg-secondary',
      buttonText: 'text-white',
    },
    dark: {
      accent: 'text-accent-neon',
      accentBg: 'bg-accent-neon',
      accentHover: 'hover:bg-accent-neon-hover',
      accentBgOpacity: 'bg-accent-neon/10',
      cardBg: 'bg-dark-bg-secondary',
      cardBorder: 'border border-gray-800',
      cardHoverBorder: 'hover:border-accent-neon',
      secondaryText: 'text-dark-text-secondary',
      secondaryBg: 'bg-dark-bg-secondary',
      buttonText: 'text-dark-bg',
    }
  };

  const currentTheme = themeClasses[theme];

  // Reusable animation props for elements that fade in while scrolling into view
  const fadeInOnScroll: MotionProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const openWhatsApp = () => {
    const msg = "Hi! I’d like a technical demo of your drone technology (from the Technology page).";
    window.open(`https://wa.me/919585299409?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="technology" className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        <motion.div 
          {...fadeInOnScroll}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold">Our Cutting-Edge Technology</h1>
          <p className={`mt-4 text-base md:text-lg ${currentTheme.secondaryText} max-w-3xl mx-auto`}>
            The hardware and software that power our precision and efficiency.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-20">
          <motion.div {...fadeInOnScroll}><TechCard themeClasses={currentTheme} icon={<DroneFleetIcon />} title="Our Drone Fleet">
            State-of-the-art UAVs equipped with long-range capabilities, heavy payload capacity, and RTK precision for sub-centimeter accuracy.
          </TechCard></motion.div>
          <motion.div {...fadeInOnScroll}><TechCard themeClasses={currentTheme} icon={<SensorIcon />} title="Advanced Sensors">
            High-resolution RGB cameras, multispectral sensors for crop analysis, and thermal imaging cameras for infrastructure and energy audits.
          </TechCard></motion.div>
          <motion.div {...fadeInOnScroll}><TechCard themeClasses={currentTheme} icon={<AnalyticsIcon />} title="Data & Analytics Platform">
            Proprietary software that processes terabytes of aerial data into actionable insights, 3D models, and comprehensive reports.
          </TechCard></motion.div>
        </div>

        {/* Data Visualization Section */}
        <motion.div 
          {...fadeInOnScroll}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold">From Data to Decisions</h2>
          <p className={`mt-4 text-base md:text-lg ${currentTheme.secondaryText} max-w-3xl mx-auto`}>
            We don't just collect data; we transform it into clear, visual, and actionable intelligence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-20">
          <motion.div {...fadeInOnScroll}><DataVisualizationCard
              title="Thermal Inspection Overlay"
              description="Our thermal sensors detect anomalies invisible to the naked eye. We overlay this data on high-resolution images to pinpoint issues in solar farms, power lines, and building envelopes."
              imageUrl="/images/technology/thermal-inspection.jpeg"
              themeClasses={currentTheme}
            /></motion.div>
          <motion.div {...fadeInOnScroll}><DataVisualizationCard
              title="3D Site Model & Volumetrics"
              description="We create accurate 3D digital twins of construction sites and quarries. This allows for precise volumetric calculations, progress tracking, and as-built verification."
              imageUrl="/images/technology/3d-model.jpeg"
              themeClasses={currentTheme}
            /></motion.div>
        </div>

        {/* WhatsApp CTA Section */}
        <motion.div 
          {...fadeInOnScroll}
          className={`${currentTheme.secondaryBg} p-8 md:p-10 rounded-lg ${currentTheme.cardBorder} text-center`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for a Technical Demo?</h2>
          <p className={`${currentTheme.secondaryText} max-w-2xl mx-auto mb-8`}>
            See our technology in action. Schedule a personalized demo with our technical team to understand how we can integrate with your specific project needs.
          </p>
          <button
            onClick={openWhatsApp}
            className={`${currentTheme.accentBg} ${currentTheme.buttonText} font-bold py-3 px-8 rounded-full shadow-lg ${currentTheme.accentHover} transform hover:scale-105 transition-all duration-300 ease-in-out`}
          >
            Request a Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyPage;
