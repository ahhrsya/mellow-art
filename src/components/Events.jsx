import React from 'react';

const Events = () => {
    return (
        <section id="events" className="section-padding" style={{ backgroundColor: 'var(--warm-white)' }}>
            <div className="container">
                {/* Header */}
                <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
                    <div>
                        <div style={{ fontFamily: 'DM Sans', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                            On the Horizon
                        </div>
                        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
                            Upcoming <span className="editorial italic">Markets</span>
                        </h2>
                    </div>
                    <a href="#all-events" className="btn btn-ghost with-border">View All Events →</a>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
                    {/* Featured Event Card */}
                    <div className="reveal hover-lift" style={{ position: 'relative', minHeight: '520px', backgroundColor: 'var(--plum)', borderRadius: '24px', overflow: 'hidden', border: '2px solid var(--stroke)' }}>
                        {/* Image Placeholder */}
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--blush)', opacity: 0.3 }}>
                            {/* This would be an img tag in prod */}
                        </div>

                        {/* Gradient Overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,20,18,0.9) 0%, transparent 60%)' }} />

                        {/* Content */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '48px', color: 'white' }}>
                            <div style={{ display: 'inline-block', backgroundColor: 'var(--mustard)', color: 'var(--plum)', padding: '4px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '16px', border: '1px solid var(--stroke)' }}>
                                Featured Event
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>SAT 12 & SUN 13 JULY 2025</div>
                            <h3 style={{ color: 'white', fontSize: '40px', marginBottom: '12px' }}>Winter Design Market</h3>
                            <div style={{ fontSize: '14px', marginBottom: '32px', opacity: 0.8 }}>📍 Royal Exhibition Building, Melbourne</div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <a href="#tickets" className="btn btn-primary with-border pill" style={{ border: 'none' }}>Get Tickets</a>
                                <a href="#details" className="btn pill" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>Event Details</a>
                            </div>
                        </div>
                    </div>

                    {/* Side Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { date: { d: '15', m: 'AUG' }, title: 'Mellow Makers Night', loc: '📍 Collingwood Yards' },
                            { date: { d: '22', m: 'SEP' }, title: 'Spring Art Pop-up', loc: '📍 Fed Square' },
                            { date: { d: '05', m: 'OCT' }, title: 'Mellow Art Festival', loc: '📍 Abbotsford Convent' },
                        ].map((event, i) => (
                            <div key={i} className="reveal" style={{
                                display: 'flex', gap: '24px', backgroundColor: 'var(--cream)', padding: '24px',
                                borderRadius: '20px', border: '2px solid var(--stroke)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                    e.currentTarget.style.borderColor = 'var(--terracotta)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.borderColor = 'var(--stroke)';
                                }}
                            >
                                <div style={{
                                    backgroundColor: 'var(--mustard)', width: '80px', height: '80px',
                                    flexShrink: 0, border: '2px solid var(--stroke)', borderRadius: '12px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <div style={{ fontFamily: 'Boogaloo', fontSize: '28px', color: 'var(--plum)' }}>{event.date.d}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--plum)' }}>{event.date.m}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h4 className="editorial" style={{ fontSize: '20px', marginBottom: '4px' }}>{event.title}</h4>
                                    <div style={{ fontSize: '13px', opacity: 0.6 }}>{event.loc}</div>
                                </div>
                            </div>
                        ))}

                        <a href="#all" className="btn btn-secondary with-border hard-shadow" style={{ marginTop: 'auto', width: '100%', borderRadius: '16px' }}>
                            Browse All Events →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
