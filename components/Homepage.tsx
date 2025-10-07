
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView as useFramerInView } from 'framer-motion';
import type { Page } from '../App';

// --- Reusable Hooks ---

// Hook for animated number counter
const useCountUp = (end: number, duration: number, start: boolean) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (!start) return;

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                 setCount(end); // Ensure it ends on the exact number
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, start]);

    return count;
};


// --- Reusable Icons ---

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
);

const ExperienceIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h2.25" /></svg>;
const SurveyedIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" /></svg>;
const SpeedIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const SafetyIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const UnmuteIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 3.99L7.83 8H4v8h3.83l4.17 4.01V3.99zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>;
const MuteIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>;

// --- Section Components ---

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};


const StatCard: React.FC<{ icon: React.ReactNode; value: number; label: string; suffix?: string; inView: boolean; }> = ({ icon, value, label, suffix, inView }) => {
    const count = useCountUp(value, 2000, inView);
    return (
        <div className="text-center">
            <div className="bg-accent-green/10 p-4 rounded-full inline-block mb-4">
                {icon}
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-light-text">{count.toLocaleString()}{suffix}</p>
            <p className="text-light-text-secondary mt-1 text-sm md:text-base">{label}</p>
        </div>
    );
};

const ServicePreviewCard: React.FC<{ img: string; title: string; alt: string; onNavigate: () => void }> = ({ img, title, alt, onNavigate }) => (
    <motion.div 
      className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
      onClick={onNavigate}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
        <img src={img} alt={alt} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <span className="text-accent-green font-semibold flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <span>Learn More</span>
                <ArrowRightIcon className="w-5 h-5" />
            </span>
        </div>
    </motion.div>
);

const VideoTestimonial: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef(null);
    const inView = useFramerInView(containerRef, { once: true, amount: 0.5 });


    useEffect(() => {
        if (inView) {
            setIsPlaying(true);
        }
    }, [inView]);

    const videoSrc = `https://www.youtube.com/embed/EIBEiakLVqY?si=HGci1WYPbXCEBv9N&autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&controls=0&loop=1&playlist=EIBEiakLVqY`;

    return (
        <div 
            ref={containerRef} 
            className="relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-cover bg-center bg-gray-800"
            style={{ backgroundImage: "url('/images/home/video-testimonial-bg.jpg')" }}
        >
            {isPlaying && <iframe ref={iframeRef} src={videoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
                {isMuted ? <MuteIcon className="w-6 h-6" /> : <UnmuteIcon className="w-6 h-6" />}
            </button>
        </div>
    );
};

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; }> = ({ quote, name, title }) => (
  <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 h-full flex flex-col relative">
    <p className="text-light-text-secondary mb-6 flex-grow z-10">"{quote}"</p>
    <div>
      <p className="font-bold text-light-text">{name}</p>
      <p className="text-sm text-light-text-secondary">{title}</p>
    </div>
  </div>
);

const LogoPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="text-gray-500 text-center text-lg font-semibold tracking-wide flex items-center justify-center min-h-[6rem]">
    {name}
  </div>
);

interface HomepageProps {
  onNavigate: (page: Page) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const statsRef = useRef(null);
  const statsInView = useFramerInView(statsRef, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <motion.div className="absolute inset-0 h-[150%] -top-[50%]" style={{ y: parallaxY }}>
            <img src="/images/home/hero-background.jpg" alt="A drone flying over a lush green agricultural field" className="w-full h-full object-cover" loading="eager" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 z-10" />
        <div className="container mx-auto px-4 sm:px-6 text-center z-20">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {"Precision Aerial Intelligence".split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Eagle Agro delivers unparalleled drone services for agriculture, infrastructure, and surveying. We turn aerial data into actionable insights.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <button onClick={() => onNavigate('Services')} className="w-full sm:w-auto bg-accent-green hover:bg-accent-green-hover text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">Explore Our Services</button>
            <button onClick={() => onNavigate('Contact')} className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-dark-bg font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">Contact Us</button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section ref={statsRef} className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<ExperienceIcon className="h-8 w-8 text-accent-green" />} value={5} suffix="+" label="Years of Field Experience" inView={statsInView} />
            <StatCard icon={<SurveyedIcon className="h-8 w-8 text-accent-green" />} value={10000} suffix="+" label="Acres Sprayed" inView={statsInView} />
            <StatCard icon={<SpeedIcon className="h-8 w-8 text-accent-green" />} value={10} suffix="x" label="Faster Coverage Speed" inView={statsInView} />
            <StatCard icon={<SafetyIcon className="h-8 w-8 text-accent-green" />} value={100} suffix="%" label="Crop Safety & Precision" inView={statsInView} />
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <span className="text-accent-green font-semibold">THE EAGLE AGRO ADVANTAGE</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-light-text mt-2 mb-4">
                  Pioneering Aerial Solutions
                </h2>
                <p className="text-base md:text-lg text-light-text-secondary">
                  Eagle Agro was founded on the principle that advanced technology can solve real-world problems. We specialize in deploying state-of-the-art drone technology to provide critical data and operational support to industries vital to our economy and environment.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.img
                  src="/images/logo.jpg"
                  alt="Eagle Agro Innovations Logo"
                  className="max-w-xs w-full rounded-lg shadow-2xl"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 md:py-20 bg-green-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-light-text">Core Services</h2>
              <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">Driving progress with precision data from the sky.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServicePreviewCard img="/images/services/service-surveys.jpg" title="Aerial Surveys" alt="Drone flying over a vast green field for an aerial survey" onNavigate={() => onNavigate('Services')} />
              <ServicePreviewCard img="/images/services/service-inspections.jpg" title="Infrastructure Inspections" alt="Drone inspecting a large wind turbine for maintenance" onNavigate={() => onNavigate('Services')} />
              <ServicePreviewCard img="/images/services/grid-overlay.jpg" title="Precision Mapping" alt="Top-down view of a digital map with grid lines over a landscape" onNavigate={() => onNavigate('Services')} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-light-text">Hear From Our Partners</h2>
              <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">See how we collaborate with industry leaders to achieve remarkable results.</p>
            </div>
            <VideoTestimonial />
          </AnimatedSection>
        </div>
      </section>

      {/* Founder & Vision Section */}
      <section className="py-16 md:py-20 bg-green-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center md:order-last">
                <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full shadow-lg ring-4 ring-accent-green/30">
                  <img src="/images/about/neyan.png" alt="A. Neyan, Founder & Director" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="text-center md:text-left md:order-first">
                <span className="text-accent-green font-semibold">OUR VISION</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-light-text mt-2 mb-4">
                  Leading the Future of Aerial Intelligence
                </h2>
                <p className="text-base md:text-lg text-light-text-secondary mb-6">
                  To be the leading force in the drone service industry, driving innovation and sustainability across all sectors we serve.
                </p>
                <div>
                  <p className="font-bold text-light-text text-lg">A. Neyan</p>
                  <p className="text-md text-accent-green font-semibold">Founder & Director</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Case Studies Showcase */}
      <section className="py-16 md:py-20 bg-green-50/50">
         <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-light-text">Proven Results</h2>
              <p className="mt-4 text-base md:text-lg text-light-text-secondary max-w-3xl mx-auto">Explore our success stories and see the tangible impact of our work.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServicePreviewCard img="/images/case-studies/1.png" title="Boosting Crop Yield by 20%" alt="Lush green crops in a field, signifying high yield" onNavigate={() => onNavigate('Case Studies')} />
                <ServicePreviewCard img="/images/case-studies/2.png" title="Saving 150+ Hours in Construction" alt="A busy construction site with cranes and workers" onNavigate={() => onNavigate('Case Studies')} />
          </div>
          </AnimatedSection>
         </div>
      </section>

      {/* Testimonials & Client Logos */}
      <section className="py-16 md:py-20 bg-green-50/50">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-light-text">What Our Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <TestimonialCard 
                quote="EagleAgro’s drone survey completely changed the way we manage our fields. We could spot waterlogging and pest-affected areas much earlier, which helped save a big part of our harvest. Their team is reliable and easy to work with."
                name="K. Murugan"
                title="Farm Manager, Thanjavur Delta Region"
              />
              <TestimonialCard 
                quote="Before EagleAgro’s mapping service, we depended on manual inspection that took days. Now, with their precise aerial data, we plan irrigation and fertilizer use in hours. It’s been a real boost to our farm’s productivity."
                name="S. Anitha"
                title="Agriculturalist, Erode District"
              />
            </div>
            <div className="text-center">
                <h3 className="text-sm font-bold uppercase text-light-text-secondary tracking-widest">Trusted by Industry Leaders</h3>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
                    <LogoPlaceholder name="Thiru Arooran Sugar Mills" />
                    <LogoPlaceholder name="Kala Group of Companies" />
                    <LogoPlaceholder name="Thirumandagudi Agro Cluster" />
                    <LogoPlaceholder name="Garuda Aerospace" />
                </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </>
  );
};

export default Homepage;