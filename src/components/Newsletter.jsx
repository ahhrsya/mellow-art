import React from 'react';

const Newsletter = () => {
    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--cream)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', backgroundColor: 'var(--mustard)', padding: '6px 20px', borderRadius: '99px', fontSize: '12px', fontWeight: 'bold', border: '2px solid var(--stroke)', marginBottom: '32px' }}>
                    Stay in the loop
                </div>

                <h2 className="reveal" style={{ fontSize: 'clamp(36px, 6vw, 60px)', color: 'var(--plum)', marginBottom: '16px' }}>
                    Be the first to know what's coming up
                </h2>

                <p className="editorial italic reveal" style={{ fontSize: '18px', color: 'var(--plum)', opacity: 0.8, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                    Market dates, artist announcements, stall applications & stories — straight to your inbox. No noise.
                </p>

                <form className="reveal" style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap' }} onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="your-email@example.com"
                        style={{
                            flex: 1, padding: '16px 24px', borderRadius: '99px', border: '2px solid var(--stroke)',
                            backgroundColor: 'white', fontFamily: 'DM Sans', fontSize: '16px', outline: 'none',
                            minWidth: '280px'
                        }}
                    />
                    <button className="btn btn-primary with-border hard-shadow" style={{ minWidth: '160px' }}>
                        Subscribe ✦
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '12px', opacity: 0.45 }}>
                    No spam, ever. You can unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
