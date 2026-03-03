import React from 'react';

const Journal = () => {
    return (
        <section id="journal" className="section-padding" style={{ backgroundColor: 'var(--warm-white)' }}>
            <div className="container">
                {/* Header */}
                <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
                    <div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>
                            Stories & Resources
                        </div>
                        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
                            The <span className="editorial italic">Journal</span>
                        </h2>
                    </div>
                    <a href="#all-journal" className="btn btn-ghost with-border">Read All →</a>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '32px' }}>
                    {/* Main Feature */}
                    <div className="reveal" style={{ backgroundColor: 'white', border: '2px solid var(--stroke)', borderRadius: '24px', overflow: 'hidden' }}>
                        <div style={{ height: '320px', backgroundColor: 'var(--blush)', borderBottom: '2px solid var(--stroke)' }}></div>
                        <div style={{ padding: '32px' }}>
                            <div style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '12px' }}>Artist Spotlight</div>
                            <h3 className="editorial" style={{ fontSize: '28px', marginBottom: '16px' }}>From Kitchen Table to Sold-Out Stall: Alison's Story</h3>
                            <p style={{ fontSize: '15px', color: 'var(--plum)', opacity: 0.7, marginBottom: '24px' }}>
                                She started making ceramics to cope with burnout. Three years later, she's one of Mellow Art's most beloved makers. This is how she got here.
                            </p>
                            <a href="#read" style={{ color: 'var(--terracotta)', fontWeight: 'bold', textDecoration: 'none' }}>Read Story →</a>
                        </div>
                    </div>

                    {/* Side Column 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div className="reveal" style={{ backgroundColor: 'white', border: '2px solid var(--stroke)', borderRadius: '24px', overflow: 'hidden', flex: 1 }}>
                            <div style={{ height: '160px', backgroundColor: 'var(--mustard)', borderBottom: '2px solid var(--stroke)' }}></div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>Tips</div>
                                <h3 className="editorial" style={{ fontSize: '18px', lineHeight: 1.3 }}>How to Set Up a Market Stall That Actually Converts</h3>
                            </div>
                        </div>
                        <div className="reveal" style={{ backgroundColor: 'white', border: '2px solid var(--stroke)', borderRadius: '24px', overflow: 'hidden', flex: 1 }}>
                            <div style={{ height: '160px', backgroundColor: 'var(--sage)', borderBottom: '2px solid var(--stroke)' }}></div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>Community</div>
                                <h3 className="editorial" style={{ fontSize: '18px', lineHeight: 1.3 }}>Why We're Building a Directory — Not a Marketplace</h3>
                            </div>
                        </div>
                    </div>

                    {/* Side Column 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div className="reveal" style={{ backgroundColor: 'white', border: '2px solid var(--stroke)', borderRadius: '24px', overflow: 'hidden', flex: 1 }}>
                            <div style={{ height: '160px', backgroundColor: 'var(--terracotta)', borderBottom: '2px solid var(--stroke)', opacity: 0.8 }}></div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>Melbourne Guide</div>
                                <h3 className="editorial" style={{ fontSize: '18px', lineHeight: 1.3 }}>5 Best Coffee Spots near the Royal Exhibition Building</h3>
                            </div>
                        </div>
                        <div className="reveal" style={{ border: '2px solid var(--stroke)', borderRadius: '24px', overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--plum)' }}>
                            <div style={{ textAlign: 'center', color: 'var(--mustard)' }}>
                                <div style={{ fontSize: '40px' }}>✦</div>
                                <div style={{ fontFamily: 'Boogaloo', fontSize: '24px' }}>Join the Newsletter</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journal;
