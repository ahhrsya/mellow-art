import React from 'react';

const Marquee = () => {
    const content = "Independent Art ✦ Melbourne Markets ✦ Meet the Maker ✦ Handcrafted Goods ✦ Support Local Artists ✦ Ethical Buying ✦ Stall Applications Open ✦ Real Art. Real People. ✦ ";

    return (
        <section className="marquee-section with-border" style={{ backgroundColor: 'var(--plum)', position: 'relative', overflow: 'hidden', borderLeft: 'none', borderRight: 'none', padding: '12px 0' }}>
            <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container {
          display: flex;
          white-space: nowrap;
          width: fit-content;
        }
        .marquee-row-1 {
          animation: scrollLeft 30s linear infinite;
        }
        .marquee-row-2 {
          animation: scrollRight 30s linear infinite;
        }
      `}</style>

            <div className="marquee-row-1 marquee-container" style={{ borderBottom: '2px solid var(--stroke)', paddingBottom: '8px' }}>
                <div style={{ color: 'var(--mustard)', fontFamily: 'Boogaloo', fontSize: '24px', paddingRight: '10px' }}>
                    {content.repeat(4)}
                </div>
            </div>

            <div className="marquee-row-2 marquee-container" style={{ paddingTop: '8px' }}>
                <div style={{ color: 'var(--mustard)', fontFamily: 'Boogaloo', fontSize: '24px', paddingRight: '10px' }}>
                    {content.repeat(4)}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
