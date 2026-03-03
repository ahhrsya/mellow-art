import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--plum)', color: 'white', padding: '80px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    {/* Logo & Tagline */}
                    <div>
                        <div style={{ fontFamily: 'Boogaloo', fontSize: '32px', color: 'var(--mustard)', marginBottom: '16px' }}>Mellow Art</div>
                        <p className="editorial italic" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.5, marginBottom: '24px' }}>
                            Handcrafted markets for independent makers and art lovers in Melbourne.
                        </p>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                            Tickets powered by Humanitix — profits go to charity 💛
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em' }}>Attend</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['Upcoming Events', 'Past Events', 'Get Tickets', 'Visitor Info'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                            ))}
                        </div>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em' }}>Artists</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['Artist Directory', 'Apply for a Stall', 'Partnerships', 'Volunteer'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                            ))}
                        </div>
                    </div>

                    {/* Links 3 */}
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em' }}>Mellow Art</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['About', 'Journal', 'FAQ', 'Contact', 'Privacy Policy'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ pt: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', paddingTop: '32px' }}>
                    <div>© 2025 Mellow Art</div>
                    <div>Built with ♥ by Jen Clark Design × Elux Space</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
