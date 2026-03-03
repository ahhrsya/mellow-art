import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (currentScrollPos / height) * 100;

      setScrollPercent(scrolled);

      if (currentScrollPos > 160) {
        setVisible(prevScrollPos > currentScrollPos);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    // Nav entrance animation
    gsap.fromTo('.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      className={`navbar with-border`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '72px',
        backgroundColor: 'var(--cream)',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          height: '2px',
          backgroundColor: 'var(--terracotta)',
          width: `${scrollPercent}%`,
          transition: 'width 0.1s linear'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--plum)', fontFamily: 'Boogaloo' }}>
          Mellow Art
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Events', 'Artists', 'Journal', 'Apply', 'About'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--plum)',
                textDecoration: 'none',
                textTransform: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--terracotta)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--plum)'}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Action */}
        <a
          href="#tickets"
          className="btn btn-secondary pill with-border"
          style={{ padding: '8px 24px', fontSize: '14px' }}
        >
          Get Tickets →
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
