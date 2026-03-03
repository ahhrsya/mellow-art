import React from 'react';

const Artists = () => {
    const artists = [
        { name: 'Alison Green', craft: 'Ceramics', loc: 'Melbourne, AU', color: '#F0C4B0' },
        { name: 'Toby Smith', craft: 'Abstract Oils', loc: 'Fitzroy, AU', color: '#7AAE8E' },
        { name: 'Sarah Wu', craft: 'Printmaking', loc: 'Brunswick, AU', color: '#E8B84B' },
        { name: 'Liam Chen', craft: 'Digital Art', loc: 'Richmond, AU', color: '#D4603A' },
        { name: 'Emma Rose', craft: 'Jewelry', loc: 'St Kilda, AU', color: '#FDFAF4' },
        { name: 'Discover 200+', craft: 'Independent Artists', loc: 'Melbourne & Beyond', color: 'var(--plum)', isCTA: true },
    ];

    return (
        <section id="artists" className="section-padding" style={{ backgroundColor: 'var(--cream)' }}>
            <div className="container">
                {/* Header */}
                <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
                    <div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>
                            The Community
                        </div>
                        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
                            Meet the <span className="editorial italic">Makers</span>
                        </h2>
                    </div>
                    <a href="#all-artists" className="btn btn-ghost with-border">See All Artists →</a>
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="reveal" style={{
                display: 'flex', gap: '32px', overflowX: 'auto', padding: '10px 40px 40px',
                scrollbarWidth: 'thin', scrollbarColor: 'var(--terracotta) var(--cream)'
            }}>
                {artists.map((artist, i) => (
                    <div
                        key={i}
                        className="artist-card with-border"
                        style={{
                            width: '280px', flexShrink: 0, backgroundColor: 'var(--warm-white)',
                            borderRadius: '24px', transition: 'all 0.3s ease', cursor: 'pointer',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg)';
                            e.currentTarget.style.boxShadow = '8px 8px 0 var(--stroke)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) rotate(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ height: '240px', backgroundColor: artist.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '48px', opacity: 0.2 }}>{artist.isCTA ? '✦' : '👤'}</span>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <h4 className="editorial" style={{ fontSize: '20px', marginBottom: '4px', color: artist.isCTA ? 'var(--plum)' : 'inherit' }}>{artist.name}</h4>
                            <div style={{ fontSize: '13px', opacity: 0.6, marginBottom: '16px' }}>{artist.craft}</div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--sage)' }}>📍 {artist.loc}</div>

                            {artist.isCTA && (
                                <button className="btn btn-primary with-border pill" style={{ marginTop: '16px', width: '100%', fontSize: '12px', padding: '8px' }}>
                                    Browse All
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Artists;
