import { useEffect, useState } from 'react';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ScrollTopButton from '@/components/ScrollTopButton/ScrollTopButton';
import CtaSection from '@/sections/CtaSection/CtaSection';
import EmotionSection from '@/sections/EmotionSection/EmotionSection';
import FeaturesSection from '@/sections/FeaturesSection/FeaturesSection';
import FutureSection from '@/sections/FutureSection/FutureSection';
import HeroSection from '@/sections/HeroSection/HeroSection';
import InteriorSection from '@/sections/InteriorSection/InteriorSection';
import ProblemSection from '@/sections/ProblemSection/ProblemSection';

import styles from './App.module.scss';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.noiseOverlay} aria-hidden="true" />
      <Navbar />
      <ScrollTopButton visible={showScrollTop} onClick={scrollToTop} />

      <main className={styles.main}>
        <HeroSection />
        <ProblemSection />
        <InteriorSection />
        <FeaturesSection />
        <EmotionSection />
        <FutureSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

