import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Events from './components/Events';
import Mission from './components/Mission';
import Artists from './components/Artists';
import DualCTA from './components/DualCTA';
import Journal from './components/Journal';
import Testimonial from './components/Testimonial';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Global reveals
    const reveals = gsap.utils.toArray('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Events />
        <Mission />
        <Artists />
        <DualCTA />
        <Journal />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
