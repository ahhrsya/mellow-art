import React from 'react';

const Mission = () => {
    return (
        <section id="about" className="section-padding" style={{ backgroundColor: 'var(--mustard)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '80px', alignItems: 'center' }}>
                    {/* Image */}
                    <div className="reveal" style={{
                        backgroundColor: 'var(--cream)', minHeight: '480px', borderRadius: '24px',
                        border: '2px solid var(--stroke)', boxShadow: '12px 12px 0 var(--stroke)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ fontSize: '100px', opacity: 0.1, position: 'absolute' }}>✦ ★ ✦</div>
                        <div style={{ textAlign: 'center', zIndex: 1 }}>
                            <span style={{ fontSize: '32px' }}>🎨 ✨ 🤝</span>
                            <p className="editorial italic" style={{ marginTop: '16px', opacity: 0.6 }}>Art for the people.</p>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="reveal">
                        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '16px' }}>
                            Our Why
                        </div>
                        <h2 style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1, marginBottom: '24px' }}>
                            Art isn't a product.<br />
                            It's a <span className="editorial italic" style={{ borderBottom: '3px solid var(--terracotta)' }}>conversation</span><br />
                            worth having.
                        </h2>
                        <p className="editorial" style={{ fontSize: '20px', lineHeight: 1.65, color: 'var(--plum)', opacity: 0.85, marginBottom: '40px' }}>
                            In a world of fast scrolling and overnight shipping, Mellow Art is building something slower — and more meaningful. A space where independent makers share their stories, and buyers discover art that actually matters to them.
                        </p>

                        <a href="#story" className="btn btn-primary with-border" style={{ marginBottom: '48px' }}>Meet Our Story →</a>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {["Playfulness", "Accessibility", "Storytelling", "Community"].map((tag, i) => (
                                <div key={i} className="with-border pill" style={{ padding: '6px 16px', backgroundColor: 'var(--cream)', fontSize: '12px', fontWeight: 'bold' }}>
                                    {i === 0 ? '🎨 ' : i === 1 ? '♿ ' : i === 2 ? '📖 ' : '🤝 '} {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
