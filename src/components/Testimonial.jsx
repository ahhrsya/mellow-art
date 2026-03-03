import React, { useState, useEffect } from 'react';

const Testimonial = () => {
    const [index, setIndex] = useState(0);
    const testimonials = [
        { quote: "I came for the ceramics and left with a painting, a candle, and three new favourite artists. It felt like the internet, but real.", author: "Emma R.", role: "Market Visitor · Melbourne 2024" },
        { quote: "The best curated market in Melbourne. The energy is incredible and the artists are so passionate about their work.", author: "James T.", role: "Art Collector · Fitzroy 2023" },
        { quote: "Mellow Art gives us a platform that feels like home. It's more than a market, it's a huge creative community.", author: "Alison G.", role: "Ceramicist · Brunswick 2024" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--plum)', borderTop: '2px solid var(--stroke)', borderBottom: '2px solid var(--stroke)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--mustard)', marginBottom: '32px' }}>
                    Word of Mouth
                </div>

                <div style={{ position: 'relative', height: '240px', maxWidth: '800px', margin: '0 auto' }}>
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute', inset: 0, opacity: index === i ? 1 : 0,
                                transition: 'opacity 1s ease', display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', pointerEvents: index === i ? 'auto' : 'none'
                            }}
                        >
                            <p className="editorial italic" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'white', lineHeight: 1.3, marginBottom: '32px' }}>
                                <span style={{ color: 'var(--mustard)', fontSize: '1.5em', verticalAlign: 'middle', marginRight: '8px' }}>“</span>
                                {t.quote}
                                <span style={{ color: 'var(--mustard)', fontSize: '1.5em', verticalAlign: 'middle', marginLeft: '8px' }}>”</span>
                            </p>
                            <div>
                                <div style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--mustard)', letterSpacing: '0.1em' }}>
                                    {t.author}
                                </div>
                                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                                    {t.role}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
