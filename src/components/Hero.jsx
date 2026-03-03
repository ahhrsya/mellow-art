import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const cardStackRef = useRef(null);
    const parallaxRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // 1. Entrance Animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-eyebrow", { y: -30, opacity: 0, duration: 0.6, ease: "back.out(1.7)" })
            .from(".hero-title span", {
                y: 100,
                rotateX: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: "expo.out"
            }, "-=0.4")
            .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(".hero-cta", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(2)" }, "-=0.5")
            .from(".hero-stats", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
            .from(".hero-right", { x: 50, opacity: 0, duration: 1 }, "-=1");

        // 2. Card Stack Cycling
        const cards = gsap.utils.toArray('.hero-card');
        let currentIndex = 0;

        const cycleCards = () => {
            const topCard = cards[currentIndex];

            gsap.to(topCard, {
                x: 600,
                rotation: 15,
                opacity: 0,
                duration: 0.55,
                ease: "back.in(1.5)",
                onComplete: () => {
                    gsap.set(topCard, { zIndex: 0, x: 0, rotation: -2, opacity: 1 });
                    currentIndex = (currentIndex + 1) % cards.length;

                    // Re-sort z-indices and positions
                    cards.forEach((card, i) => {
                        const index = (i - currentIndex + cards.length) % cards.length;
                        gsap.to(card, {
                            zIndex: index,
                            duration: 0.6,
                            ease: "elastic.out(1, 0.6)",
                            rotation: index === cards.length - 1 ? 2 : (index === cards.length - 2 ? -3 : 4),
                            x: index === cards.length - 1 ? 0 : (index === cards.length - 2 ? -10 : 10),
                            y: index === cards.length - 1 ? 0 : (index === cards.length - 2 ? -10 : 10),
                        });
                    });
                }
            });
        };

        const interval = setInterval(cycleCards, 2800);

        // 3. Mouse Parallax
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;
            parallaxRef.current = { x, y };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const ticker = gsap.ticker.add(() => {
            const { x, y } = parallaxRef.current;
            gsap.set(".hero-title", { x: x * 8, y: y * 5 });
            gsap.set(".hero-card-stack", { x: x * 20, y: y * 15 });
            gsap.set(".hero-blob", { x: x * 35, y: y * 28 });
            gsap.set(".hero-bg-blob", { x: -x * 12, y: -y * 8 });
        });

        // 4. Floating Shapes
        gsap.utils.toArray('.floating-shape').forEach(shape => {
            gsap.to(shape, {
                x: 'random(-25, 25)',
                y: 'random(-20, 20)',
                rotation: 'random(-15, 15)',
                duration: 'random(4, 8)',
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 'random(0, 3)'
            });
        });

        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.ticker.remove(ticker);
        };
    }, []);

    const cardImages = [
        { color: '#F0C4B0', title: 'Maker 01' },
        { color: '#7AAE8E', title: 'Maker 02' },
        { color: '#E8B84B', title: 'Maker 03' },
    ];

    return (
        <section ref={heroRef} className="hero" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%', backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>

            {/* Background Decor */}
            <div className="hero-bg-blob" style={{
                position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px',
                backgroundColor: 'var(--mustard)', opacity: 0.15, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                zIndex: 0
            }} />

            {/* Left Content */}
            <div style={{ padding: '140px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }} />
                    <span style={{ fontFamily: 'DM Sans', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--terracotta)', letterSpacing: '0.05em' }}>
                        Melbourne's Artist-Led Market
                    </span>
                </div>

                <h1 className="hero-title" style={{ fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.92, marginBottom: '32px', perspective: '1000px' }}>
                    {["Where", "Real", "Art", "Finds", "Real", "People"].map((word, i) => (
                        <span key={i} style={{ display: 'inline-block', marginRight: (i === 2 || i === 5) ? '0' : '0.2em' }}>
                            {word === "Real" && i === 1 ? (
                                <span className="editorial italic" style={{ color: 'var(--terracotta)' }}>Real </span>
                            ) : word === "Art" ? (
                                <span className="editorial italic" style={{ color: 'var(--terracotta)' }}>Art </span>
                            ) : (
                                word + (i === 5 ? "" : " ")
                            )}
                        </span>
                    ))}
                </h1>

                <p className="hero-sub editorial italic" style={{ fontSize: '20px', color: 'var(--plum)', opacity: 0.75, maxWidth: '500px', marginBottom: '40px' }}>
                    Skip the scroll. Come face-to-face with the makers behind the work — at markets that celebrate craft, community, and colour.
                </p>

                <div className="hero-cta" style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
                    <a href="#events" className="btn btn-primary with-border">Find Next Event →</a>
                    <a href="#apply" className="btn btn-ghost with-border">Become a Stallholder</a>
                </div>

                <div className="hero-stats" style={{ display: 'flex', gap: '32px', paddingTop: '32px', borderTop: '1.5px solid var(--stroke)' }}>
                    {[
                        { num: '200+', label: 'Independent Artists' },
                        { num: '30k+', label: 'Art Lovers' },
                        { num: '5+', label: 'Cities & Growing' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: 'Boogaloo', fontSize: '36px', color: 'var(--plum)' }}>{stat.num}</div>
                            <div style={{ fontFamily: 'DM Sans', fontSize: '10px', textTransform: 'uppercase', color: 'var(--plum)', opacity: 0.6 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="hero-right with-border" style={{ backgroundColor: 'var(--blush)', borderRight: 'none', borderTop: 'none', borderBottom: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Decorative Shapes */}
                <div className="hero-blob floating-shape" style={{ position: 'absolute', top: '15%', left: '10%', width: '100px', height: '100px', backgroundColor: 'var(--mustard)', borderRadius: '50%', opacity: 0.3 }} />
                <div className="hero-blob floating-shape" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '80px', height: '80px', backgroundColor: 'var(--sage)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', opacity: 0.3 }} />

                <div className="hero-card-stack" style={{ position: 'relative', width: '320px', height: '420px' }}>
                    {cardImages.map((card, i) => (
                        <div
                            key={i}
                            className="hero-card with-border hard-shadow"
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden',
                                zIndex: i,
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <div style={{ flex: 1, backgroundColor: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '40px', opacity: 0.2 }}>✦</span>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontFamily: 'Fraunces', fontWeight: 'bold' }}>{card.title}</div>
                                    <div style={{ fontSize: '12px', opacity: 0.6 }}>Market Highlights</div>
                                </div>
                                <div style={{ fontSize: '20px' }}>📍</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
