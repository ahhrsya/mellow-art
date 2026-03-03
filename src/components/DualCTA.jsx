import React, { useEffect } from 'react';
import gsap from 'gsap';

const DualCTA = () => {
    useEffect(() => {
        gsap.from(".cta-left", {
            x: -100, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".dual-cta", start: "top 80%" }
        });
        gsap.from(".cta-right", {
            x: 100, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".dual-cta", start: "top 80%" }
        });
    }, []);

    return (
        <section className="dual-cta with-border" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderLeft: 'none', borderRight: 'none', overflow: 'hidden' }}>
            {/* Left Panel - Attendees */}
            <div className="cta-left" style={{ backgroundColor: 'var(--terracotta)', padding: '100px 80px', position: 'relative', borderRight: '2px solid var(--stroke)' }}>
                <div style={{ position: 'absolute', bottom: '-40px', right: '-20px', fontSize: '300px', fontFamily: 'Boogaloo', color: 'rgba(255,255,255,0.06)', zIndex: 0, pointerEvents: 'none' }}>01</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>For Art Lovers</div>
                    <h2 style={{ color: 'white', fontSize: 'clamp(40px, 4vw, 54px)', lineHeight: 1, marginBottom: '24px' }}>Ready to find something you'll love forever?</h2>
                    <p className="editorial" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '40px', maxWidth: '400px' }}>
                        Browse upcoming markets near you. Meet the maker. Hear the story. Go home with something that means something.
                    </p>
                    <a href="#events" className="btn btn-white with-border pill">Find a Market →</a>
                </div>
            </div>

            {/* Right Panel - Artists */}
            <div className="cta-right" style={{ backgroundColor: 'var(--sage)', padding: '100px 80px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '-40px', right: '-20px', fontSize: '300px', fontFamily: 'Boogaloo', color: 'rgba(255,255,255,0.06)', zIndex: 0, pointerEvents: 'none' }}>02</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--plum)', opacity: 0.6, marginBottom: '16px' }}>For Artists & Makers</div>
                    <h2 style={{ color: 'var(--plum)', fontSize: 'clamp(40px, 4vw, 54px)', lineHeight: 1, marginBottom: '24px' }}>Your work deserves a real audience.</h2>
                    <p className="editorial" style={{ color: 'var(--plum)', opacity: 0.85, fontSize: '18px', marginBottom: '40px', maxWidth: '400px' }}>
                        Apply for a stall at our next event. We curate carefully — every table is placed with intention, not just filled.
                    </p>
                    <a href="#apply" className="btn btn-white with-border pill">Apply to Exhibit →</a>
                </div>
            </div>
        </section>
    );
};

export default DualCTA;
